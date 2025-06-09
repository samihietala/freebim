import * as OBC from "@thatopen/components";
import { useRef, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";


function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let components: OBC.Components | null = null;
    let isInitializing = false;

    const initScene = async () => {
      if (!containerRef.current || !isMounted || isInitializing || isInitialized.current) return;
      const container = containerRef.current;

      // Mark as initialized to prevent duplicate initialization
      isInitialized.current = true;

      // Prevent multiple initializations
      isInitializing = true;

      // Clear any existing content more thoroughly
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      try {
        setIsLoading(true);
        setError(null);

        components = new OBC.Components();

        // Configure the IfcLoader with proper WASM settings
        const ifcLoader = components.get(OBC.IfcLoader);
        await ifcLoader.setup();

        const worlds = components.get(OBC.Worlds);

        const world = worlds.create<
          OBC.SimpleScene,
          OBC.SimpleCamera,
          OBC.SimpleRenderer
        >();

        world.scene = new OBC.SimpleScene(components);
        world.renderer = new OBC.SimpleRenderer(components, container);
        world.camera = new OBC.SimpleCamera(components);

        await components.init();

        // Set up the scene first
        world.scene.setup();

        // Add a grid
        const grids = components.get(OBC.Grids);
        grids.create(world);

        // Set camera position before loading model
        world.camera.controls?.setLookAt(12, 6, 8, 0, 0, -10);

        // Remove background for transparency
        if (world.scene.three.type === "Scene") {
          (world.scene.three as any).background = null;
        }

        if (!isMounted) return;

        console.log("Loading IFC model...");

        const fragmentIfcLoader = components.get(OBC.IfcLoader);

        const file = await fetch(
          "https://thatopen.github.io/engine_components/resources/small.ifc",
        );

        if (!file.ok) {
          throw new Error(`Failed to fetch IFC file: ${file.status}`);
        }

        const data = await file.arrayBuffer();
        const buffer = new Uint8Array(data);
        const model = await fragmentIfcLoader.load(buffer);

        if (!isMounted) return;

        if (model) {
          model.name = "example";
          world.scene.three.add(model);
          console.log("Model loaded successfully:", model);

          // Fit the model in view
          const box = new OBC.BoundingBoxer(components);
          box.add(model);
          const sphere = box.getSphere();
          world.camera.controls?.fitToSphere(sphere, true);

          if (isMounted) {
            setIsLoading(false);
          }
        } else {
          throw new Error("Failed to load model");
        }

      } catch (error) {
        console.error("Error initializing scene:", error);
        if (isMounted) {
          setError(error instanceof Error ? error.message : "Unknown error occurred");
          setIsLoading(false);
        }
      } finally {
        isInitializing = false;
      }
    };

    initScene();

    // Cleanup function
    return () => {
      isMounted = false;
      isInitializing = false;
      isInitialized.current = false;

      if (components) {
        try {
          components.dispose();
        } catch (e) {
          console.warn("Error disposing components:", e);
        }
        components = null;
      }

      // More thorough container cleanup
      if (containerRef.current) {
        const container = containerRef.current;
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-screen overflow-hidden relative">
        {isLoading && <LoadingSpinner message="Loading 3D model..." />}
        {error && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded">
            Error: {error}
          </div>
        )}
        <div className="absolute top-4 right-4 z-10">
          <ModeToggle />
        </div>
        <div
          ref={containerRef}
          className="w-full h-full"
        ></div>
      </div>
    </ThemeProvider>
  )
}

export default App

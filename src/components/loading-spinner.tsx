import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    message?: string;
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg backdrop-blur-sm">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="font-medium">{message}</p>
            </div>
        </div>
    );
}

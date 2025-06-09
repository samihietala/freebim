# FreeBIM

**FreeBIM** is an open-source, AI-native BIM authoring software designed to replace bloated, outdated tools like Revit. It's fast, modern, and built from the ground up to give architects, engineers, and designers the flexibility and performance they’ve been demanding for years.

This isn’t a plugin or a frontend to existing legacy software—**FreeBIM is a full alternative to Revit**, powered by modern web technologies, clean architecture, and native AI tooling.

## Why FreeBIM?

The AEC industry has been stuck for decades under the weight of Autodesk's monopoly. Revit is bloated, slow, expensive, and fundamentally resistant to innovation. FreeBIM exists to change that.

* No more vendor lock-in
* No more paying for features that never arrive
* No more fighting against software instead of designing

## Features

* **Full BIM authoring environment** — Everything you expect from a BIM tool, reimagined for performance and usability
* **AI-native tools** — Built-in Copilot that assists with modeling, constraint management, and design iteration. Think it like Cursor for BIM
* **Web-based** — Runs in your browser, no heavyweight installs required
* **Lightweight and multi-core** — Fast on modern hardware, scales across cores
* **Built with That Open Company components** — Modular, extensible, and easy to contribute to
* **Free and open source** — MIT licensed and designed to be self-hosted

## Installation

### Docker

```bash
docker run -p 3000:3000 ghcr.io/samihietala/freebim:latest
```

### Homebrew (or other package managers)

```bash
brew install freebim
```

Support for additional package managers (`apt`, `dnf`, etc.) coming soon.

## Use Cases

* Author full BIM models without Revit
* Use AI to assist in design and automate repetitive modeling tasks
* Deploy internally as a self-hosted BIM solution for your team or company
* Extend with your own tools using OpenCompany’s component system

## Roadmap

* Core parametric modeling and editing tools
* Full support for IFC and open formats
* Team collaboration and project versioning
* Plugin system for custom toolchains
* Optional cloud-hosted service for teams
* Offline-first mode for site work or remote conditions

## Contributing

If you're tired of waiting for Autodesk to innovate, and want to help build the future of open AEC tools, you're in the right place. Check out the open issues or start a conversation via Discussions or PRs.
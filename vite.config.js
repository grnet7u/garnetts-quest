import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite тохиргоо: React plugin л хэрэгтэй. Build нь dist/ руу гарна (Vercel үүнийг байршуулна).
export default defineConfig({ plugins: [react()] });

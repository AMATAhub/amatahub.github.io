import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// AMATAhub/amatahub.github.io is served directly at https://amatahub.github.io/.
export default defineConfig({
  plugins: [react()],
  base: '/',
});

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/**
 * Puerto del dev server de ESTE repo. Registro completo: `guarnold-hub/PUERTOS.md`.
 *
 * ! el default vive aca y no solo en el `.env`: el `.env` esta gitignoreado, asi que un clon
 * nuevo o la segunda maquina se quedarian sin asignacion y volverian al default de Vite — la
 * colision que esto viene a evitar. El `.env` sirve para PISARLO (`VITE_DEV_PORT=...`).
 *
 * Este repo usa `defineConfig({...})` (objeto, no funcion) asi que NO hay `mode` en scope;
 * se toma de `NODE_ENV`. Da igual para el puerto: `loadEnv` lee el `.env` plano en todo modo.
 */
const PUERTO_DEV = 5176

export default defineConfig({
  server: {
    // Sin esto Vite ve el puerto ocupado y levanta OTRO server en silencio: cada `npm run dev`
    // cree que es el primero y se acumulan. En Windows quedan vivos aunque cierres el editor
    // (no existe "matar el arbol": los hijos quedan reparentados). Ver guarnold-hub/ENTORNO.md.
    strictPort: true,
    port: Number(loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '').VITE_DEV_PORT) ||
      PUERTO_DEV,
  },
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
})
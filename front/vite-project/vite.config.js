import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/appointments': 'http://localhost:3001', // Redirige las solicitudes a la API
      '/credentials': 'http://localhost:3001', // Redirige las solicitudes de credenciales

    },
  },
})











// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import Sonda from 'sonda/vite'; 

import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  build:{sourcemap:true},
  plugins: [react({
    babel:{
      plugins:[
        'babel-plugin-react-compiler'
      ]
    }
  }), tailwindcss(), Sonda()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
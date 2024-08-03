import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [vue()],
    server: {
      port: 5173
    },
    css: {
      modules: {
        generateScopedName: mode === 'development' ? '[local]' : '[hash:base64:5]'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "src/assets/sass/_colors.scss";
         `
        }
      }
    }
  });

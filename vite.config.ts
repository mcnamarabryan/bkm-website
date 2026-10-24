import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createReadStream, statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Serves the built WordPress theme zip so it can be downloaded from the preview.
 *
 *   /bkm-theme.zip  →  wp-theme/bkm-technology-solutions.zip
 *
 * This is a dev-server convenience only; nothing here ships to WordPress.
 */
function themeDownload() {
  const zipPath = resolve('wp-theme/bkm-technology-solutions.zip');

  return {
    name: 'bkm-theme-download',
    configureServer(server: {
      middlewares: {
        use: (
          path: string,
          fn: (
            req: { method?: string },
            res: NodeJS.WritableStream & {
              setHeader: (k: string, v: string) => void;
              statusCode: number;
            },
            next: () => void,
          ) => void,
        ) => void;
      };
    }) {
      server.middlewares.use('/bkm-theme.zip', (req, res, next) => {
        if (!existsSync(zipPath)) {
          next();
          return;
        }

        const { size } = statSync(zipPath);

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Length', String(size));
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="bkm-technology-solutions.zip"',
        );

        createReadStream(zipPath).pipe(res as unknown as NodeJS.WritableStream);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), themeDownload()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});

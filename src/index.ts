import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { copyFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function svelteAdapterFastify({
  out = 'build',
  assets = 'assets',
  serverFile = `${__dirname}/files/server.js`
} = {}) {
  const adapter = {
    name: 'svelte-adapter-fastify',

    async adapt(builder) {
      builder.log.minor(`Copying assets to ${assets}`);
      const staticDirectory = join(out, assets);
      builder.writeClient(staticDirectory);
      builder.writeStatic(staticDirectory);

      builder.log.minor('Copying server');
      builder.writeServer(out);

      copyFileSync(serverFile, `${out}/index.js`);

      builder.log.minor('Prerendering static pages');
      await builder.writePrerendered(`${out}/prerendered`);
    }
  };

  return adapter;
};

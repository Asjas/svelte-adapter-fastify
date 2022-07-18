const { join } = require("node:path");
const { copyFileSync } = require('node:fs');

function svelteAdapterFastify({
  out = 'build',
  assets = 'assets',
  serverFile = `${join(__dirname, '/..')}/files/server.js`,
  startFile = `${join(__dirname, '/..')}/files/index.js`,
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

      copyFileSync(serverFile, `${out}/server.js`);
      copyFileSync(startFile, `${out}/index.js`);

      builder.log.minor('Prerendering static pages');
      await builder.writePrerendered(`${out}/prerendered`);
    }
  };

  return adapter;
};

module.exports = svelteAdapterFastify;

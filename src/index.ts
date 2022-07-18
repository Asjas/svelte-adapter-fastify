const { join } = require("node:path");
const { copyFileSync } = require('node:fs');

function svelteAdapterFastify({
  out = 'build',
  assets = 'assets',
  serverFile = `${__dirname}/../files/server.js`
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

      console.log('__dirname', __dirname);
      console.log('out', out);

      copyFileSync(serverFile, `${out}/index.js`);

      builder.log.minor('Prerendering static pages');
      await builder.writePrerendered(`${out}/prerendered`);
    }
  };

  return adapter;
};

module.exports = svelteAdapterFastify;

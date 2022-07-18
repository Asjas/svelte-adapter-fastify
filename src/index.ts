const { join } = require("node:path");
const { copyFileSync } = require("node:fs");

function svelteAdapterFastify({
  out = "build",
  assets = "assets",
  serverFile = `${join(__dirname, "/..")}/files/server.js`,
  startFile = `${join(__dirname, "/..")}/files/index.js`,
} = {}) {
  const adapter = {
    name: "svelte-adapter-fastify",

    adapt(builder) {
      builder.rimraf(out);

      builder.log.minor(`Copying assets to ${assets}`);
      const staticDirectory = join(out, assets);
      builder.writeClient(`${out}/client`);
      builder.writeServer(`${out}/server`);
      builder.writeStatic(staticDirectory);
      builder.writePrerendered(`${out}/prerendered`);

      copyFileSync(serverFile, `${out}/server.js`);
      copyFileSync(startFile, `${out}/index.js`);
    },
  };

  return adapter;
}

module.exports = svelteAdapterFastify;

/* eslint @typescript-eslint/no-var-requires: 0 */
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

      copyFileSync(startFile, `${out}/server/index.js`);
      copyFileSync(serverFile, `${out}/server/server.js`);
    },
  };

  return adapter;
}

module.exports = svelteAdapterFastify;

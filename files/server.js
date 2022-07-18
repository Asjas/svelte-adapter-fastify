import fastifyCompress from "@fastify/compress";
import fastifyStatic from "@fastify/static";

// This `manifest` file is created during the build process
import manifest from "./manifest.js";

async function buildServer({ server, opts }) {
  await server.register(fastifyCompress);

  await server.register(fastifyStatic, {
    root: opts.paths,
    // Set cache headers for Svelte resources
    setHeaders: (res, path) => {
      if (path.includes(`${manifest.appDir}/immutable/`)) {
        res.setHeader("Cache-Control", "public, immutable, max-age=31536000");
      } else {
        res.setHeader("Cache-Control", "no-cache");
      }

      return res;
    },
  });

  // Your own routes or plugins here
}

export default buildServer;

import fastify from "fastify";
import fastifyCompress from "@fastify/compress";
import fastifyStatic from "@fastify/static";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const {
  PORT = 3000, // eslint-disable-line no-magic-numbers
  ASSETS = join(__dirname, "assets"),
  PRERENDERED = join(__dirname, "prerendered"),
} = process.env;
  await server.register(fastifyCompress);

const app = fastify({ logger: true });

await app.register(fastifyStatic, { root: [ASSETS, PRERENDERED] });

// Your own routes here

await app.listen({ port: Number(PORT) });

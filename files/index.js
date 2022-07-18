import Fastify from "fastify";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const {
  HOST = "localhost",
  PORT = 3000, // eslint-disable-line no-magic-numbers
  ASSETS = join(__dirname, "assets"),
  PRERENDERED = join(__dirname, "prerendered"),
} = process.env;

const app = Fastify({ logger: true });

const server = await buildServer(app, { paths: [ASSETS, PRERENDERED] });

await server.listen({ host: HOST, port: Number(PORT) });

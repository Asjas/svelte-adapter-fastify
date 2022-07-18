# `svelte-adapter-fastify`

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm version](https://badge.fury.io/js/svelte-adapter-fastify.svg)](https://badge.fury.io/js/svelte-adapter-fastify)
[![codecov](https://codecov.io/gh/Asjas/svelte-adapter-fastify/branch/main/graph/badge.svg?token=IHWSO9MQ7B)](https://codecov.io/gh/Asjas/svelte-adapter-fastify)
[![Main WorkFlow](https://github.com/Asjas/svelte-adapter-fastify/actions/workflows/main.yml/badge.svg)](https://github.com/Asjas/svelte-adapter-fastify/actions/workflows/main.yml)
[![CodeQL WorkFlow](https://github.com/Asjas/svelte-adapter-fastify/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Asjas/svelte-adapter-fastify/actions/workflows/codeql-analysis.yml)

<div align="center">

`svelte-adapter-fastify` is a [SvelteKit](https://kit.svelte.dev/docs/introduction) plugin for the
[Fastify](https://github.com/fastify/fastify) framework.

| :warning: WARNING: This project is considered to be in `BETA` until SvelteKit is available for general use and the Adapter API is stable! |
| ----------------------------------------------------------------------------------------------------------------------------------------- |

## Beta Adapter Version Compatibility

| Adapter Version | SvelteKit Version |
| --------------- | ----------------- |
| `0.0.11`        | `1.0.0-next.377`  |
| `0.0.10`        | `1.0.0-next.377`  |

**Note**: only the versions listed have been tested together, if others happen to work, it is just coincidence. This is
beta software after all.

</div>

## Supported Fastify versions

- Fastify v4.x

## Supported Node.js versions

The latest versions of the following Node.js versions are tested and supported.

- 16
- 18

## Quick Start

Install the package using `npm`:

```sh
npm i --save-exact svelte-adapter-fastify
```

or `yarn`:

```sh
yarn add svelte-adapter-fastify
```

or `pnpm`:

```sh
pnpm add --save-exact svelte-adapter-fastify
```

## Setup

Replace the default `@sveltejs/adapter-auto` with `svelte-adapter-fastify` in the `svelte.config.js` file:

```diff
import preprocess from 'svelte-preprocess';
- import adapter from '@sveltejs/adapter-auto';
+ import fastifyAdapter from "svelte-adapter-fastify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
-   adapter: adapter(),
+   adapter: fastifyAdapter(),
  },
  methodOverride: {
    allowed: ['PATCH', 'DELETE'],
  }
};

export default config;
```

Then:

```
npm run build
```

Which will generate the Fastify server `./build/index.js` which can be run:

```
PORT=3000 node ./build/index.js
```

## Custom Fastify Server

To run a customized server, start by copying the default server from the `svelte-adapter-fastify` module:

```sh
mkdir -p adapter/fastify
cp node_modules/svelte-adapter-fastify/files/index.js adapter/fastify
cp node_modules/svelte-adapter-fastify/files/server.js adapter/fastify
```

Edit the `server.js` and `index.js` files to meet your needs. You can add `routes` and other `plugins` to the custom
Fastify server. By default the server will listen on `localhost`, if you are deploying on GCP or in a Dockerfile then
you would need to set the `HOST` environment variable to `0.0.0.0`.

_A very important note: Any changes to the `index.js` or `server.js` file will only reflect after a new build._

At build time refer to this custom server. When configuring the adapter in `svelte.config.js`, add both `serverFile` and
`startFile` parameters:

```diff
import preprocess from 'svelte-preprocess';
import fastifyAdapter from 'svelte-adapter-fastify';
+ import path from 'node:path';

+ const __dirname = path.resolve();

const config = {
  preprocess: preprocess(),
  kit: {
    adapter: fastifyAdapter({
+     serverFile: path.join(__dirname, './adapter/fastify/server.js'),
+     startFile: path.join(__dirname, './adapter/fastify/index.js'),
    }),
  },
  methodOverride: {
    allowed: ['PATCH', 'DELETE'],
  }
};

export default config;
```

Build / Run as normal

```sh
npm run build
PORT=3000 node ./build/index.js
```

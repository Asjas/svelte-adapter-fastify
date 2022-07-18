# `svelte-adapter-fastify`

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm version](https://badge.fury.io/js/svelte-adapter-fastify.svg)](https://badge.fury.io/js/svelte-adapter-fastify)
[![codecov](https://codecov.io/gh/Asjas/svelte-adapter-fastify/branch/main/graph/badge.svg?token=IHWSO9MQ7B)](https://codecov.io/gh/Asjas/svelte-adapter-fastify)
[![Main WorkFlow](https://github.com/Asjas/svelte-adapter-fastify/actions/workflows/main.yml/badge.svg)](https://github.com/Asjas/svelte-adapter-fastify/actions/workflows/main.yml)
[![CodeQL WorkFlow](https://github.com/Asjas/svelte-adapter-fastify/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Asjas/svelte-adapter-fastify/actions/workflows/codeql-analysis.yml)

`svelte-adapter-fastify` is a [SvelteKit](https://kit.svelte.dev/docs/introduction) plugin for the [Fastify](https://github.com/fastify/fastify) framework.

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

## Configuration

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
		allowed: ['PATCH', 'DELETE']
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

To run a customized server, start by copying the default server from the module:

```sh
mkdir -p adapter/fastify
cp node_modules/svelte-adapter-fastify/files/server.js adapter/fastify
```

Edit the `server.js` to meet your needs. You can add `compression`, `routes` and other `plugins` to the custom Fastify server.

At build time refer to this custom server. When configuring the adapter in `svelte.config.js`, add a `serverFile` parameter:

```diff
import preprocess from 'svelte-preprocess';
import fastifyAdapter from 'svelte-adapter-fastify';
+ import path from 'node:path';

+ const __dirname = path.resolve();

const config = {
  preprocess: preprocess(),
  kit: {
    adapter: fastifyAdapter({
+     serverFile: path.join(__dirname, './adapter/fastify/server.js')
    }),
  },
  methodOverride: {
		allowed: ['PATCH', 'DELETE']
	}
};

export default config;
```

Build / Run as normal

```sh
npm run build
PORT=3000 node ./build/index.js
````

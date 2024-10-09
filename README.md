# Vue Based Monorepo Template

- [Vue Based Monorepo Template](#vue-based-monorepo-template)
  - [Description](#description)
  - [Project setup / Installation](#project-setup--installation)
    - [Additional commands](#additional-commands)
  - [Development](#development)
  - [Build](#build)
  - [Environment variables](#environment-variables)
    - [NODE\_ENV \& VITE MODE](#node_env--vite-mode)
    - [VITE\_APP\_\*](#vite_app_)

## Description

This is a monorepo template for frontend libraries and applications.  
It is focused on the Vue.js framework, but can be easily adapted to other frameworks.  
Used tools and libraries:

- `nx` as a monorepo manager
- `husky` and `conventional-commits` for commit linting
- `yarn` workspaces for dependency management
- `eslint` (with`@stylistic/eslint-plugin` instead of prettier) for linting
- `vite` as a development server and build tool
- `typescript` for type safety
- `tailwindcss` for styling

The template contains a few example libraries and applications with some basic functionality.

- `@monorepo/app_1` - example application using the shared libraries
- `@monorepo/commons` - shared library with some basic helpers and Vue composables
- `@monorepo/ui` - shared library with some basic styling and components

## Project setup / Installation

Assuming that you have already installed `Node.js`,  
go to the root directory - `/Frontend` and run the following commands.

```bash
# Install globally Yarn package manager
npm install -g yarn

# Install dependencies
yarn run init
```

### Additional commands

```bash
# Install dependencies for ci
## Helpful when you want to install all dependencies for a CI pipeline,  
## reassuring that they are installed exactly as in the `yarn.lock` file.
yarn run ci

# Clean dependencies
## Helpful when you want to reinstall all dependencies.
yarn run clean
```

<details><summary>Why yarn?</summary>

Because we are using monorepo structure, we have to use so called `workspaces` as well.  
Yarn `workspaces` implementation is far superior to the npm one, by providing more features and better performance.  

For example package hoisting, which allows us installing dependencies in the root `node_modules`  
and save time and dependency management overhead are working much better in Yarn.  
Good explanation of the struggle with npm caveats is provided by [this article](https://medium.com/@d.ts/how-to-use-npm-workspace-d155076da956).

</details>

## Development

All commands, tips and tricks and documentation about used tools and libraries are in the  
[DEVELOPMENT.md](./docs/DEVELOPMENT.md) file.

## Build

Nx will only run build for the affected projects and commands.  
This will only work if you have a Git repository initialized and the changes are committed.  
Default check if a package/project is affected is made by comparing the head of the current branch  
against the main branch.

```bash
yarn run build:prod
# or
yarn run build:staging
```

The builds are saved in the `/Frontend/dist` directory.

**IMPORTANT**  
 In an CI pipeline you require another command to check for affected packages.  
[Read more](https://nx.dev/ci/features/affected#specify-which-shas-to-use-to-calculate-affected-code)

## Environment variables

### NODE_ENV & VITE MODE

🟥**IMPORTANT**  
Do not add and commit `.env` file to projects. There is a known problem with the Nx commands  
causing usage of the `.env` file for every build mode, no matter what mode is set in the command.  
If you need some local environment variables, use `.env.development.local` file.

The NODE_ENV=production is not supported in the .env file in Vite  
Only NODE_ENV=development is supported to create a development build of the project  
Vite has also so called Mode, depending on the .env file used for build or a serve command.  

Respectively it uses

- `.env` or `.env.development` file for development mode (serve command)
- `.env.production` file for production mode (build command)
- `.env.[mode]` file for custom mode (build command with --mode [mode] argument)

More about modes [here](https://vitejs.dev/guide/env-and-mode.html#modes)  

To make use of it in your code, you can use `import.meta.env.MODE` variable.

```javascript
if (import.meta.env.MODE !== 'production') {
  console.log('Not the production mode');
}
```

### VITE_APP_*

Use `VITE_APP_` prefix to expose environment variables to your app  

```bash
VITE_APP_API_URL=https://api.example.com
```

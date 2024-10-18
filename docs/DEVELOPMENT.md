# Development

- [Development](#development)
  - [Commands](#commands)
  - [Commits](#commits)
  - [Environment variables](#environment-variables)
  - [Dependencies management](#dependencies-management)
    - [Add new dependencies](#add-new-dependencies)
    - [Update dependencies](#update-dependencies)
  - [Libraries](#libraries)
    - [Use library in an app](#use-library-in-an-app)
    - [Add new library](#add-new-library)
      - [Adding library types to the app](#adding-library-types-to-the-app)
  - [Linting, formatting and types](#linting-formatting-and-types)
    - [ESLint](#eslint)
      - [ESLint in Visual Studio Code](#eslint-in-visual-studio-code)
      - [ESLint in Rider](#eslint-in-rider)
    - [Tailwind](#tailwind)
      - [Tailwind in Visual Studio Code](#tailwind-in-visual-studio-code)
      - [Tailwind in Rider](#tailwind-in-rider)
    - [Typescript](#typescript)
      - [Missing types from libraries](#missing-types-from-libraries)
      - [Setting up the typescript configuration](#setting-up-the-typescript-configuration)

<br>

## Commands

To start the development server, build or see the build preview of a specific app  
go to this project directory and look for a `README.md` for more information.

All projects are located in the `/apps` directory.

<br>

## Commits

Thanks to the `commitlint` and `husky` packages, the commits are checked for the correct format.  
The commit message should be in the following format:

```bash
# type: feat, fix, docs, ...
# scope: the part of the project you are working on (optional)
# subject: short description of the changes
git commit -m "<type>(<scope>): <subject>"
```

Read more about the [Conventional Commits](https://github.com/conventional-changelog/commitlint)

<br>

## Environment variables

Before you add any environment variables or files to the project, please read section **Environment variables**  
in [README.md](./../README.md#environment-variables) file in the root directory.

<br>

## Dependencies management

### Add new dependencies

Go to the root directory and run the following command.

```bash
# for dependencies 
yarn add <package-name> -W

# for devDependencies
yarn add <package-name> -DW
```

If a specific package is required **only for one** specific project, then go to the directory of this project  
and run the same command without the `-W` flag.

```bash
# for dependencies
yarn add <package-name>

# for devDependencies
yarn add <package-name> -D
```

<br>

### Update dependencies

```bash
yarn upgrade-interactive --latest
```

<br>

## Libraries

### Use library in an app

To use a library in an app, follow these steps:

1. Add it to the `package.json` file of the project without the version number.  
By doing so you will always get the latest version of the library.

    ```json
    {
        "dependencies": {
            "@monorepo/<library-name>": "*"
        }
    }
    ```

2. Modify the `tsconfig.json` file of the project to include the library in the `compilerOptions.paths` object.

    ```json
    {
        "compilerOptions": {
            "paths": {
                "@monorepo/<library-name>": [
                    "libs/<library-name>/src/index.ts"
                ]
            }
        }
    }
    ```

3. Then run the following command from the root directory - `/`.

    ```bash
    yarn run init
    ```

4. Finally you can import the library parts in your app like this:

    ```typescript
    import { <library-name> } from '@monorepo/<library-name>';
    ```

<br>

### Add new library

Libraries in the monorepo are located in the `/libs` directory.  
In our case they are not meant to be build separately, but to be used in the projects.  

To add a new library:

1. go to the directory - `/libs` and add a new directory with the library name
2. copy and paste the following files from an existing library:
    - `package.json`
    - `tsconfig.json`
    - `.eslint.json`
    - `README.md`
    - src/`index.ts`
    - src/`vue-shim.d.ts` (if the library is for Vue.js)
3. finally modify the `package.json` file with
    - the new unique library name
    - as well as planned exports if they should be any different,
    - add dependencies & devDependencies  
      (only if they are unique for this library; otherwise they should be added to the root `package.json` file)  

A standard `package.json` file for a library looks like this:

```json
{
    "name": "@monorepo/<library-name>",
    "version": "1.0.0",
    "private": true,
    "type": "module",
    "exports": {
        ".": "./src/index.ts",
        "./composables/*": "./src/composables/*",
        "./lib/*": "./src/lib/"
    },
    "nx": {
        "projectType": "library"
    },
    "scripts": {
        "lint": "eslint --ext .js,.jsx,.ts,.tsx,.vue src",
        "lint:fix": "eslint --ext .js,.jsx,.ts,.tsx,.vue --fix src"
    },
    "dependencies": {}
}
```

#### Adding library types to the app

Be aware that if you define the `exports` field in the `package.json` file, you most probably  
need to add in your app project a clear definition of the paths in the `tsconfig.json` file.

```json
{
    "compilerOptions": {
        "paths": {
            "@monorepo/<library-name>": [
                "libs/<library-name>/src/index.ts"
            ],
            "@monorepo/<library-name>/composables/*": [
                "libs/<library-name>/src/composables/*"
            ],
            "@monorepo/<library-name>/lib/*": [
                "libs/<library-name>/src/lib/*"
            ]
        }
    }
}
```

<br>

## Linting, formatting and types

### ESLint

The ESLint configuration is located in the `.eslintrc.json` file in the root directory  
and is imported and extended in the apps if needed.

There is no Prettier in this monorepo for a good reason. Having yet another tool to format the code and solving  
the conflicts between Prettier and ESLint is avoided thanks to the Anthony Fu's  `@stylistic/eslint-plugin` package.  
Now ESLint can do the same and at the same time warn us about the code quality.

[More on this subject](https://medium.com/@jolodev/my-thoughts-on-eslint-dropping-formatting-rules-2bc452bee5e2)  
[ESLint Stylistic](https://eslint.style/)

**RECOMMENDED**  
Add in your IDE the ESLint extension and activate formatting on save.  

#### ESLint in Visual Studio Code

<details><summary>Visual Studio Code settings</summary>

To use the ESLint extension in Visual Studio Code, install the `dbaeumer.vscode-eslint` extension.  
Add the following settings to the `settings.json` file in Visual Studio Code for the best experience.  

You can open the `settings.json` by going to `File -> Preferences -> Settings`  
and pressing on the `{}` icon in the top right corner.

🟦 **Note**  
> If you use the default `.code-workspace` file from the root directory, you don't need to add these settings.  
> They are already there.

```json
{
    "[html]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[typescript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[vue]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "eslint.format.enable": true,
    "eslint.options": {
        "extensions": [
            ".html",
            ".js",
            ".cjs",
            ".vue",
            ".jsx"
        ]
    },
    "eslint.validate": [
        "html",
        "vue",
        "language",
        "javascriptreact",
        "typescript",
        "javascript"
    ],
}
```

</details>

#### ESLint in Rider

<details><summary>Rider settings</summary>
  
To use the ESLint extension in Rider, you need to open settings and search for ESLint and set the following settings:

- [x] Automatic ESLint configuration  
- Run for files: `**/*.{js,ts,jsx,tsx,html,vue,cjs}`  
- [x] Run eslint --fix on save

![Rider ESLint settings](./assets/rider-eslint-settings.png)

🟦 **Note**  
> If you are on a Mac you can open two windows of Rider in the same application.  
> Just open the second Project in the second window and choose the `Window -> Merge All Project Windows` option.  
> More on this subject [here](https://www.jetbrains.com/help/rider/Open_projects_and_solutions.html#switch_solutions)

</details>

<br>

### Tailwind

To work with a projects utilizing Tailwind CSS, you should **(strongly recommended)** install the Tailwind CSS IntelliSense extension.  
You will find one in the marketplace for Visual Studio Code as well as for Rider.

The extension will provide you with the IntelliSense for the Tailwind CSS classes, but not everywhere you could need it.  
That's why we developed additional configuration.

#### Tailwind in Visual Studio Code

<details><summary>Visual Studio Code settings</summary>

To use the Tailwind extension in Visual Studio Code, install the `bradlc.vscode-tailwindcss` extension.  
Add the following settings to the `settings.json` file in Visual Studio Code for the best experience.  

You can open the `settings.json` by going to `File -> Preferences -> Settings`  
and pressing on the `{}` icon in the top right corner.

🟦 **Note**  
> If you use the default `.code-workspace` file from the root directory, you don't need to add these settings.  
> They are already there.

```jsonc
{
    "tailwindCSS.experimental.classRegex": [
        // for VuePrime styling. Example: class: [strings_in_this_array]
        [
            "class:\\s*\\[((?:[^[\\]]|\\[(?:[^[\\]]|\\[[^[\\]]*\\])*])*?)\\]",
            "(?:['\"`]([^'\"`]*)['\"`])"
        ],
        // for computed functions. Example: const textClass = computed(() => ['text-red'])
        [
            "computed\\(\\s*\\(\\s*\\)\\s*=>\\s*([\\s\\S]*?)\\)",
            "(?:['\"`]([^'\"`]*)['\"`])"
        ],
        // additional inline option - add /*tw:*/ before any string
        "\\/\\*\\s?tw:\\s?\\*\\/\\s?['\"`](.*)['\"`]"
    ],
}
```

</details>

#### Tailwind in Rider

<details><summary>Rider settings</summary>

Install the `Tailwind CSS` plugin from the JetBrains marketplace.  
Then go to the `File -> Settings -> Languages & Frameworks -> Style Sheets -> Tailwind CSS`  
and ad this configuration to the `experimental > classRegex` field.

```json
{
    "experimental": {
        "classRegex": [
            [
                "class:\\s*\\[((?:[^[\\]]|\\[(?:[^[\\]]|\\[[^[\\]]*\\])*])*?)\\]",
                "(?:['\"`]([^'\"`]*)['\"`])"
            ],
            [
                "computed\\(\\s*\\(\\s*\\)\\s*=>\\s*([\\s\\S]*?)\\)",
                "(?:['\"`]([^'\"`]*)['\"`])"
            ],
            "\\/\\*\\s?tw:\\s?\\*\\/\\s?['\"`](.*)['\"`]"
        ]
    }
}
```

</details>

<br>

### Typescript

The typescript configuration is located in the `tsconfig.base.json` file in the root directory.  
All projects are (app and libs) are extending this configuration.

#### Missing types from libraries

Check if the library index file or one of the shortcuts to library directories is not missing  
in the in the app in `tsconfig.json` file. More on this subject in the [Adding library types to the app](#adding-library-types-to-the-app) section.

```json
{
    "compilerOptions": {
        "paths": {
            "@monorepo/<library-name>": [
                "libs/<library-name>/src/index.ts"
            ]
        }
    }
}
```

#### Setting up the typescript configuration

Keep in mind that referencing the `tsconfig.json` file in a project and changing any of the settings  
will not merge everything with the `tsconfig.base.json` file but partially override it.  
[More on this subject](https://miyoon.medium.com/array-parameters-in-tsconfig-json-are-always-overwritten-11c80bb514e1)

To see the typescript configuration, you can run the following command from the directory  
in which you want to see the local one - a merge/overwrite of the base and the extending one.  

```bash
npx tsc --showconfig
```

# UI Library

This library contains Components and styles for our projects.

- [UI Library](#ui-library)
  - [Documentation](#documentation)
  - [Development](#development)
    - [New Components](#new-components)
    - [Storybook](#storybook)
    - [Styles](#styles)
  - [Using the library in your project](#using-the-library-in-your-project)
    - [Components usage](#components-usage)
    - [Styles usage](#styles-usage)
      - [Importing Tailwind configuration](#importing-tailwind-configuration)

<br>

## Documentation

This library uses Storybook to document the components.  
To run it locally, use the following command:

```bash
yarn run storybook:dev
```

<br>

## Development

```bash
# Develop with storybook
yarn run storybook:dev
```

### New Components

1. Add your new component to the `atoms`, `molecules`, `organisms`, or `templates` directory.  
   Read more: [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/).
2. Remember to add your new components to the `src/index.ts` file.

<br>

### Storybook

Project is using Storybook to enable isolated development and document components.

To use it add a new story file for your freshly created component in the same directory and don't  
forget about description, if you feel like things are not self-explanatory.

```js
//...
parameters: {
    docs: {
        description: {
            component: "Test description of the whole component",
        },
    },
},
```

Read more [Storybook Docs (Vue)](https://storybook.js.org/docs/vue/writing-stories/introduction).

<br>

### Styles

Styles are using Tailwind CSS. This means that you should use its classes whenever possible and add custom  
ones only when necessary. Most of changes can be done in the project's `tailwind.config.js` file.  
The one in this library is imported to other projects, therefore it should be seen as a base configuration and used  
with caution.

To add some custom classes use `src/assets/styles` directory. They should remain split into directories mirroring  
Tailwind layers: `base`, `components` and `utilities`.

<br>

## Using the library in your project

### Components usage

You can import the components you need in your project like so:

```typescript
import { MyClass, MyFunction, type MyType } from "@monorepo/ui";
```

By configuring TypeScript correctly, you can also use the intellisense of your IDE to see component properties and types.

For more info, check [Use library in an app](./../../docs/DEVELOPMENT.md#use-library-in-an-app) and
[Adding library types to the app](./../../docs/DEVELOPMENT#adding-library-types-to-the-app) in the development documentation.

Should you need to import something directly from the component file, you can do it like so:

```js
import { type Props as ButtonProps } from '@monorepo/ui/src/atoms/Button/ButtonItem.vue'
```

<br>

### Styles usage

#### Importing Tailwind configuration

To add styles in your project you can import the `tailwind.config.ts` file from this library.

```ts
import { type Config } from 'tailwindcss'
import uiLibPreset from '@monorepo/ui/tailwind.config'

export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        // './node_modules/<your_library>/**/*.{vue,js,ts,jsx,tsx}'
        './../../libs/ui/src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    presets: [
        // base configuration
        uiLibPreset
    ],
    plugins: [],
    theme: {
        extend: {}
    }
// Add this line to achieve the correct type checking
} satisfies Config
```

Additionally you can add custom styles from the `src/assets/styles` directory:

```css
/* base */
@import "tailwindcss/base";
@import '@monorepo/ui/src/assets/styles/base/index.css';
/* components */
@import "tailwindcss/components";
@import '@monorepo/ui/src/assets/styles/components/index.css';
/* utilities */
@import "tailwindcss/utilities";
@import '@monorepo/ui/src/assets/styles/utilities/index.css';
```

<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Nagell/monorepo_template">
    <img src="/docs/assets/logo_color.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Vue Based Monorepo Template</h3>

  <p align="center">
    Monorepo template for Vue.js applications and libraries
    <br />
    <a href="./docs/DEVELOPMENT.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Nagell/monorepo_template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Nagell/monorepo_template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Vue Based Monorepo Template - Cover][product-cover]

I've built this monorepo template for frontend libraries and applications based on pnpm workspaces and Nx.  
The ease of code reusability as well as good starting point for optimized builds will provide you  
a solid foundation for projects that are expected to grow.

Although this template is focused on the Vue.js framework, it can be easily adapted to other ones.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

The template contains a few example libraries and applications with some basic functionality.  
It also demonstrates the connections between them such as usage of outsourced components and composables.  

- `@monorepo/app_1` - example application using shared libraries.
- `@monorepo/commons` - shared library with some useful helpers and Vue composables.
- `@monorepo/ui` - shared library with basic styling, starter components and Storybook.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Nx][Nx]][Nx-url]
- [![pnpm][pnpm]][pnpm-url]
- [![Husky][Husky]][Husky-url]
- [![Vite][Vite]][Vite-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![ESLint][ESLint]][ESLint-url]
- [![Vue][Vue]][Vue-url]
- [![Tailwind CSS][Tailwind CSS]][Tailwind CSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- pnpm:

    ```bash
    npm install -g pnpm
    ```

    <details><summary>Why pnpm?</summary>
    Because we are using a monorepo structure, we have to use so called `workspaces` as well.  
    pnpm's `workspaces` implementation is fast, efficient, and disk-space friendly due to its unique symlinked node_modules structure.  

    For example, package hoisting and dependency management are handled efficiently by pnpm.  
    You can read more about pnpm's advantages in the [official documentation](https://pnpm.io/motivation).
    </details>

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Nagell/monorepo_template.git
    ```

2. Install dependencies

    ```bash
    pnpm run init
    ```

3. Start the development server

    ```bash
    # Start the app_1
    cd apps/app_1
    pnpm run dev

    # Start the Storybook
    cd libs/ui
    pnpm nx storybook -p 6006
    ```

All commands, tips and documentation for used tools and libraries can be found in the  
[DEVELOPMENT.md](./docs/DEVELOPMENT.md) file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See [Licence.md][license-url] for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Dawid Nitka - [LinkedIn][linkedin-url]

Project Link: [https://github.com/Nagell/monorepo_template](https://github.com/Nagell/monorepo_template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [@stylistic/eslint-plugin](https://eslint.style/packages/default)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/badge/License-MIT-lightgrey.svg?style=for-the-badge
[license-url]: ./LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/dawidnitka
[product-cover]: /docs/assets/cover.png

[Nx]: https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white
[Nx-url]: https://nx.dev/
[pnpm]: https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white
[pnpm-url]: https://pnpm.io/
[Husky]: https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=husky&logoColor=white
[Husky-url]: https://typicode.github.io/husky/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[ESLint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[Vue]: https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white
[Vue-url]: https://vuejs.org/
[Tailwind CSS]: https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind CSS-url]: https://tailwindcss.com/

# Schiffe versenken

This application was build in context of the subject Programmieren von Webanwendungen. This subject is part of the undergraduate program of the Berlin School of Economics and Laws. 


<details>
    <summary>Click me for a frontend guide</summary>

# frontend

This fronend is build with VueJS, Vite and TypeScript

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

</details>

<details>
    <summary>Click me for a backend guide</summary>

# backend

This backend is build with python 3.11.0 and java 17. Python is used to handle the messages and game logic. Java takes a part if a connection is refused and save the game into a mongodb.

## Recommended IDE setup
[VSCode](https://code.visualstudio.com/) + [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) + [Java extension](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) + [Maven extension](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)

## Required modules
Latest version of [FastAPI](https://fastapi.tiangolo.com) <br>
Latest version of [MongoDB](https://www.mongodb.com)

## Project setup

```
uvicorn run app:main
```
</details>


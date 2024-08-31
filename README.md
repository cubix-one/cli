# Cubix Framework

## Table of Contents

- [Introduction](#1-introduction)
- [Installation](#2-installation)
- [Getting Started](#3-getting-started)
  - [Creating a New Project](#31-creating-a-new-project)
  - [Project Structure](#32-project-structure)
- [Annotations](#4-annotations)
  - [List of Annotations](#41-list-of-annotations)
  - [Using Annotations](#42-using-annotations)
- [CLI](#5-cli)
  - [Available Commands](#51-available-commands)
  - [Global Options](#52-global-options)
- [Development](#6-development)
  - [Watch Mode](#61-watch-mode)
  - [Compilation](#62-compilation)
- [Architecture](#7-architecture)
- [Roblox Studio Integration](#8-roblox-studio-integration)
- [Best Practices](#9-best-practices)
- [Troubleshooting](#10-troubleshooting)
- [Contributing](#11-contributing)
- [License](#12-license)

## 1. Introduction

Cubix is a powerful and flexible framework for Roblox game development. It provides a CLI (Command Line Interface) that facilitates project creation and management, allowing developers to focus on game logic rather than worrying about environment setup.

Cubix uses roblox-ts under the hood, enabling you to write your code in TypeScript, taking advantage of all the benefits of static typing and modern language features.

One of the key features of Cubix is the use of annotations to organize code. These annotations allow you to define where each file should be placed in Roblox Studio, maintaining a clean and organized code structure.

## 2. Installation

To install Cubix, you need to have Node.js and npm (or yarn) or Bun installed on your system. Then, you can install Cubix globally using the following command:

> **RECOMMENDED**
>
>```bash
>bun install -g cubix-one
>```
>.

Or if you prefer using npm:

```bash
npm install -g cubix
```

Or if you prefer using yarn:

```bash
yarn global add cubix
```

## 3. Getting Started

### 3.1. Creating a New Project

To create a new Cubix project, use the command:

```bash
cubix init <project-name>
```

This command will create a new folder with your project name and set up all the necessary files.

> **NOTE:**
>
> If you don't provide a project name, the cli starts a interactive mode to create a new project without a name.

### 3.2. Project Structure

After creation, your project will have a structure similar to this:

```
my-roblox-project/
├── src/
│ ├── main.ts
├── out/
├── cubix.tsconfig.json
├── tsconfig.json
├── package.json
└── README.md
```

- `src/`: Contains all the source code of your project.
- `out/`: Folder where the compiled code will be generated.
- `cubix.tsconfig.json`: Cubix-specific configurations and settings.
- `tsconfig.json`: TypeScript configurations.
- `package.json`: npm configuration file with project dependencies.

## 4. Annotations

Annotations are a key feature of Cubix. They are used to define where each file should be placed in Roblox Studio.

### 4.1. List of Annotations

Here's the complete list of annotations supported by Cubix:

- 'client_controller'
- 'client_module'
- 'client_component'
- 'ui_component'
- 'client_inputs'
- 'event_listeners'
- 'server_controller'
- 'server_module'
- 'server_component'
- 'event_handlers'
- 'shared_module'
- 'shared_constants'
- 'shared_types'
- 'shared_utils'

### 4.2. Using Annotations

To use an annotation, add it as a comment at the beginning of your TypeScript file. For example:

```typescript
'client_controller'
export default class MyClientController {
    // ...
}
```

> **NOTE:**
>
> The annotation must be the first line in the file.
> you can put more than one annotation if you want to.
> but the first one is the most important one.
> because it tells the cli what type of file it is.
>
> you're not limited to use class only, you can use any paradigms like
> functional programming, object-oriented programming, etc.
>
> like this:
>
> ```typescript
> 'client_controller'
> export default function myClientController() {
>     // ...
> }
>```
> or
>
> ```typescript
> 'client_controller'
> const MyClientController = () => {
>     // ...
> }
> export default MyClientController;
> ```
>
> stay free to create your code as you want.
> 

## 5. CLI

The Cubix CLI offers several commands to assist in your project development.

### 5.1. Available Commands

- `cubix init <project-name>`: Initialize a new Cubix project.
- `cubix build`: Build your project.
- `cubix watch`: Starts the watch mode for development.
- `cubix help`: Show help for a command.

### 5.2. Global Options

- `-r, --rootDir <dir>`: Specifies the root directory.
- `-o, --outputDir <dir>`: Specifies the output directory.
- `-w, --watch`: Enables watch mode for file changes.

## 6. Development

### 6.1. Watch Mode

To start the watch mode, which automatically recompiles your code when it detects changes, use:

```bash
cubix watch
```

> **NOTE:**
>
> for you, to start the watch mode, just run <package-manager> run watch.
> because we already installed cubix in your project when you run `cubix init <project-name>`.
>
> for example:
>
> ```bash
> bun run watch
> ```
> .

### 6.2. Compilation

To manually compile your project, use:

```bash
cubix build
```

> **NOTE:**
>
> for you, to compile your project, just run <package-manager> run build.
> because we already installed cubix in your project when you run `cubix init <project-name>`.
>
> for example:
>
> ```bash
> bun run build
> ```
> .

This command will compile your project and generate the output in the `out/` directory.

## 7. Architecture

Cubix doesn't impose a specific architecture for your project. This allows you to organize your code in the way you see fit. However, we recommend following good development practices and maintaining a clear and modular structure.

## 8. Roblox Studio Integration

Cubix takes care of Roblox Studio integration automatically. When you compile your project, the files are organized in the correct structure within Roblox Studio based on the annotations you used.

## 9. Best Practices

1. Use annotations consistently to keep your code organized.
2. Take advantage of TypeScript benefits to write safer and more readable code.
3. Keep your files small and focused on a single responsibility.
4. Use TypeScript's module system to organize your code.
5. Leverage the watch mode during development for rapid iteration.

## 10. Troubleshooting

If you encounter issues, check:

1. If all dependencies are correctly installed.
2. If you're using the latest versions of Cubix and roblox-ts.
3. If your annotations are correctly written.
4. The error logs for more detailed information.

## 11. Contributing

Contributions to Cubix are always welcome! Please refer to the CONTRIBUTING.md file in the project repository for guidelines on how to contribute.

## 12. License

Cubix is distributed under the MIT license. See the LICENSE file in the project repository for more details.

This documentation provides a comprehensive overview of the Cubix Framework. For more detailed information about specific features or advanced usage, please refer to the official documentation or contact the support team.
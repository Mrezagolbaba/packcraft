# packcraft

A CLI tool to quickly scaffold new projects with common development tools and configurations. Packcraft helps developers jumpstart their projects by automatically setting up a well-structured development environment with best practices and modern tooling.

## Why Packcraft?

- 🚀 **Zero Configuration**: Get started with new projects in seconds, not hours
- 🎯 **Best Practices**: Follows industry standards and modern development practices
- 🔧 **Flexible Setup**: Choose between JavaScript or TypeScript with customizable tooling
- 📦 **Smart Defaults**: Comes with sensible default configurations that you can customize later
- 🛠️ **Development Ready**: Includes essential development tools preconfigured:
  - Code Formatting (Prettier)
  - Code Linting (ESLint)
  - Testing Framework (Jest)
  - Git Hooks (Husky)
  - Commit Message Linting (Commitlint)
- 🎨 **Clean Structure**: Generates a well-organized project structure
- 🔄 **Multiple Package Managers**: Supports npm, yarn, and pnpm
- 📚 **Documentation**: Includes ready-to-use README and configuration files

## What's Included?

Based on your selections, Packcraft can set up:

### JavaScript Projects
- Modern ES6+ setup
- Node.js best practices
- CommonJS or ESM modules

### TypeScript Projects
- Latest TypeScript configuration
- Type checking and compilation setup
- Source mapping for debugging

### Development Tools
- **Prettier**: Consistent code formatting across your project
- **ESLint**: Code quality rules and best practices
- **Jest**: Testing framework with example tests
- **Husky**: Automated git hooks for better code quality
- **Commitlint**: Standardized commit messages


## Installation

```bash
npm install -g packcraft
```

## Features

- 🚀 Quick project setup
- 🔧 Support for JavaScript and TypeScript
- 🛠️ Configurable development tools:
  - Prettier for code formatting
  - ESLint for code linting
  - Jest for testing
  - Husky for git hooks
  - Commitlint for commit message linting
- 📦 Multiple package manager support (npm, yarn, pnpm)

## Usage

```bash
npx packcraft
```

Then follow the interactive prompts:
1. Enter your project name
2. Choose language (JavaScript/TypeScript)
3. Select development tools setup:
   - Basic (Prettier + ESLint)
   - Testing (Prettier + ESLint + Jest)
   - Full (All tools)
   - Custom (Pick your tools)
4. Choose your preferred package manager

## Generated Project Structure

```
your-project/
├── src/
│   └── index.js/ts
├── package.json
├── README.md
├── .prettierrc (if selected)
├── .eslintrc (if selected)
├── jest.config.js (if selected)
├── tsconfig.json (if TypeScript)
└── .gitignore
```

## Development

To contribute to this project:

1. Clone the repository
```bash
git clone https://github.com/yourusername/packcraft.git
```

2. Install dependencies
```bash
cd packcraft
npm install
```

3. Create symlink for testing
```bash
npm link
```

## License

ISC

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Support

If you have any questions or run into issues, please open an issue on the GitHub repository.
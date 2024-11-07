#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name('create-quick-start')
  .description('CLI to create new projects with custom configurations')
  .version('1.0.0');

  async function promptUser() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: 'my-app'
      },
      {
        type: 'list',
        name: 'language',
        message: 'Which language would you like to use?',
        choices: ['JavaScript', 'TypeScript']
      },
      {
        type: 'list',
        name: 'toolPreset',
        message: 'Choose your development tools setup:',
        choices: [
          {
            name: 'Basic (Prettier + ESLint)',
            value: 'basic'
          },
          {
            name: 'Testing (Prettier + ESLint + Jest)',
            value: 'testing'
          },
          {
            name: 'Full (Prettier + ESLint + Jest + Husky + Commitlint)',
            value: 'full'
          },
          {
            name: 'Custom (Choose your own tools)',
            value: 'custom'
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'customTools',
        message: 'Select the tools you want to include:',
        when: (answers) => answers.toolPreset === 'custom',
        choices: [
          'Prettier',
          'ESLint',
          'Jest',
          'Husky',
          'Commitlint'
        ]
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager do you prefer?',
        choices: ['npm', 'yarn', 'pnpm']
      }
    ]).then(answers => {
      // Convert tool preset to actual tools array
      let tools;
      switch (answers.toolPreset) {
        case 'basic':
          tools = ['Prettier', 'ESLint'];
          break;
        case 'testing':
          tools = ['Prettier', 'ESLint', 'Jest'];
          break;
        case 'full':
          tools = ['Prettier', 'ESLint', 'Jest', 'Husky', 'Commitlint'];
          break;
        case 'custom':
          tools = answers.customTools;
          break;
      }
      
      return {
        ...answers,
        tools: tools
      };
    });
  }

async function generateReadme(projectName, options) {
  const template = `# ${projectName}

## Description
Project created with create-quick-start CLI

## Technologies Used
- Language: ${options.language}
${options.tools.map(tool => `- ${tool}`).join('\n')}

## Getting Started
1. Clone this repository
2. Install dependencies: \`${options.packageManager} install\`
3. Start development

## Scripts
- \`${options.packageManager} start\`: Start the development server
- \`${options.packageManager} test\`: Run tests
- \`${options.packageManager} build\`: Build for production

## License
MIT
`;

  return template;
}

async function generatePackageJson(projectName, options) {
  const dependencies = {
    prod: {},
    dev: {}
  };

  if (options.language === 'TypeScript') {
    dependencies.dev['typescript'] = '^5.0.0';
    dependencies.dev['@types/node'] = '^20.0.0';
  }

  if (options.tools.includes('Prettier')) {
    dependencies.dev['prettier'] = '^3.0.0';
  }

  if (options.tools.includes('ESLint')) {
    dependencies.dev['eslint'] = '^8.0.0';
  }

  if (options.tools.includes('Jest')) {
    dependencies.dev['jest'] = '^29.0.0';
  }

  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: 'Project created with create-quick-start CLI',
    main: 'index.js',
    type: options.language === 'TypeScript' ? 'module' : 'commonjs',
    scripts: {
      test: options.tools.includes('Jest') ? 'jest' : 'echo "No tests specified"',
      start: 'node index.js',
      build: options.language === 'TypeScript' ? 'tsc' : 'echo "No build step"'
    },
    dependencies: dependencies.prod,
    devDependencies: dependencies.dev,
    license: 'MIT'
  };

  return JSON.stringify(packageJson, null, 2);
}

async function createProject() {
  try {
    const answers = await promptUser();
    const projectPath = path.join(process.cwd(), answers.projectName);

    // Create project directory
    await fs.mkdir(projectPath);

    // Create README.md
    const readmeContent = await generateReadme(answers.projectName, answers);
    await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);

    // Create package.json
    const packageJsonContent = await generatePackageJson(answers.projectName, answers);
    await fs.writeFile(path.join(projectPath, 'package.json'), packageJsonContent);

    // Create src directory
    await fs.mkdir(path.join(projectPath, 'src'));

    // Create index file
    const indexExtension = answers.language === 'TypeScript' ? 'ts' : 'js';
    const indexContent = `console.log('Hello from ${answers.projectName}!');`;
    await fs.writeFile(path.join(projectPath, `src/index.${indexExtension}`), indexContent);

    if (answers.language === 'TypeScript') {
      const tsConfig = {
        compilerOptions: {
          target: "es2020",
          module: "commonjs",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          outDir: "./dist"
        },
        include: ["src/**/*"],
        exclude: ["node_modules"]
      };
      await fs.writeFile(
        path.join(projectPath, 'tsconfig.json'), 
        JSON.stringify(tsConfig, null, 2)
      );
    }

    if (answers.tools.includes('Prettier')) {
      const prettierConfig = {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 80,
        tabWidth: 2
      };
      await fs.writeFile(
        path.join(projectPath, '.prettierrc'),
        JSON.stringify(prettierConfig, null, 2)
      );
    }

    console.log(chalk.green('\nProject created successfully! 🎉'));
    console.log(chalk.blue(`\nNext steps:
1. cd ${answers.projectName}
2. ${answers.packageManager} install
3. Start coding!`));

  } catch (error) {
    console.error(chalk.red('Error creating project:'), error);
    process.exit(1);
  }
}

program.action(createProject);
program.parse();
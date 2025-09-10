module.exports = {
  extends: ['@commitlint/config-conventional', 'gitmoji'],
  rules: {
    // Define allowed commit types
    'type-enum': [
      2, // error level
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // documentation changes
        'style', // code style changes (no impact on functionality)
        'refactor', // code refactoring
        'perf', // performance improvements
        'test', // test additions/modifications
        'build', // build system changes
        'ci', // CI/CD configuration changes
        'chore', // other tasks
        'revert', // revert previous commit
        'init', // initial setup
      ],
    ],
    'subject-case': [0], // disable subject case rules (allow emoji usage)
    'subject-empty': [0], // allow empty subject (due to gitmoji code)
    'type-empty': [0], // allow empty type (due to gitmoji code)
    'start-with-gitmoji': [2, 'always'], // enforce gitmoji at the beginning
  },
  prompt: {
    questions: {
      type: {
        description: 'What type of change are you making to the codebase?',
        enum: {
          feat: {
            description: 'Adding a new feature or capability to the application',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Resolving a bug or issue that was causing problems',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Updating documentation, comments, or README files',
            title: 'Documentation',
            emoji: '📄',
          },
          style: {
            description: 'Formatting code, fixing whitespace, or adjusting styling without changing functionality',
            title: 'Styles',
            emoji: '🎨',
          },
          refactor: {
            description: 'Restructuring existing code to improve readability or maintainability',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'Optimizing code execution speed, memory usage, or resource consumption',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Adding new test cases, fixing existing tests, or improving test coverage',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: 'Modifying build tools, dependencies, or deployment configuration',
            title: 'Builds',
            emoji: '🔨',
          },
          ci: {
            description: 'Updating continuous integration workflows, GitHub Actions, or deployment scripts',
            title: 'Continuous Integrations',
            emoji: '🔧',
          },
          chore: {
            description: 'Routine maintenance tasks, dependency updates, or configuration changes',
            title: 'Chores',
            emoji: '📝',
          },
          revert: {
            description: 'Undoing a previous commit that introduced issues or unwanted changes',
            title: 'Reverts',
            emoji: '🗑',
          },
          init: {
            description: 'Setting up the project structure, initial configuration, or boilerplate code',
            title: 'Initialization',
            emoji: '🎉',
          },
        },
      },
      scope: {
        description:
          'Which part of the codebase is affected by this change? (e.g., component name, file path, or module)',
      },
      subject: {
        description: 'Provide a concise summary of what this change accomplishes',
      },
      body: {
        description: 'Explain the reasoning behind this change and any important details (optional)',
      },
    },
  },
};

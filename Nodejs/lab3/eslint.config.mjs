import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  // 1. Tell ESLint this is a Node.js project (allows 'require', 'module', 'console')
  {files: ['**/*.js'], languageOptions: { sourceType: 'commonjs', globals: globals.node }},

  // 2. Use the recommended base rules (finds actual errors)
  pluginJs.configs.recommended,

  // 3. YOUR Custom Rules
  {
    rules: {
      // "warn" = yellow underline (doesn't stop code)
      // "error" = red underline (stops code)
      
      'no-unused-vars': 'warn',  // Warns if you create 'x' but never use it
      'semi': ['error', 'always'], // Forces semicolons at the end of lines
      'quotes': ['error', 'single'], // Forces "double quotes" consistently
      // 'eqeqeq': 'error', // Forces === instead of == (safer!)
      'no-console': 'off', // Allows console.log (usually off for backend)
    }
  }
];
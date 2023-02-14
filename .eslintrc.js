// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['@rushstack/eslint-config/profile/node'],
  parserOptions: { tsconfigRootDir: __dirname },
  plugins: [
    'unicorn',
    'prettier',
    'simple-import-sort',
    'import',
    'jsdoc',
    // '@rushstack/eslint-plugin',
    // '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/parameter-properties': 'warn',
    '@typescript-eslint/no-parameter-properties': 'off',
    // ―――――――― eslint-config-prettier ―――――――――――――――――――――――――――――――
    // +++ eslint-config-prettier +++
    'unicorn/no-nested-ternary': 'off',
    'unicorn/number-literal-case': 'off',
    '@typescript-eslint/quotes': 0,
    // +++ eslint-config-prettier +++
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/comma-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/keyword-spacing': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/space-infix-ops': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',
    'no-void': 'off',
    curly: 'warn',
    quotes: ['warn', 'single'],
    eqeqeq: 'off',
    // 'prettier/prettier': ['warn'],
    'no-throw-literal': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@rushstack/typedef-var': 'off',
    // 'import/newline-after-import': 'off',
    // 'import/no-unresolved': 'off',
    // 'unicorn/catch-error-name': 'off',
    // 'unicorn/error-message': 'off',
    // 'unicorn/filename-case': 'off',
    // 'unicorn/no-console-spaces': 'off',
    // 'unicorn/no-process-exit': 'off',
    // 'unicorn/prefer-number-properties': 'off',
    // 'unicorn/prefer-optional-catch-binding': 'off',
    // 'unicorn/prefer-ternary': 'off',
    // ―――――――― simple-import-sort ―――――――――――――――――――――――――――――――――――
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    // 'simple-import-sort/sort': 'warn',
    '@rushstack/no-new-null': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/naming-convention': 'off',
    // ―――――――― eslint-plugin-import ――――――――――――――――――――――――――――――――――――――――――――――――
    /* Static analysis*/
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'warn',
    'import/no-unresolved': 'off',
    'import/named': 0,
    'import/default': 0,
    'import/namespace': 'error',
    'import/no-restricted-paths': 0,
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 0,
    'import/no-internal-modules': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/no-cycle': 0,
    'import/no-relative-parent-imports': 0,
    /* Helpful warnings */
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unused-modules': 'error',
    /* Style guide*/
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-namespace': 'off',
    //  "import/order": 0, // ―3 managed with simple-import-sort
    'import/exports-last': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/max-dependencies': 0,
    'import/no-unassigned-import': 0,
    'import/no-named-default': 0,
    'import/no-default-export': 0,
    'import/no-named-export': 0,
    'import/no-anonymous-default-export': 0,
    'import/group-exports': 0,
    'import/dynamic-import-chunkname': 0,
    /* Module systems*/
    'import/no-amd': 0,
    'import/no-commonjs': 0,
    'import/no-nodejs-modules': 0,
    'import/unambiguous': 0,
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    'no-unused-vars': [
      'off',
      {
        ignoreRestSiblings: true,
      },
    ],
    // ―――――――― unicorn ――――――――――――――――――――――――――――――――――――――――――――――
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/error-message': 'error',
    'unicorn/expiring-todo-comments': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/import-style': 'error',
    'unicorn/no-keyword-prefix': 'error',
    'unicorn/no-process-exit': 'off',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-unused-properties': 'error',
    'unicorn/better-regex': 'warn',
    'unicorn/catch-error-name': 'warn',
    'unicorn/custom-error-definition': 'warn',
    'unicorn/escape-case': 'warn',
    'unicorn/explicit-length-check': 'warn',
    'unicorn/new-for-builtins': 'warn',
    'unicorn/no-console-spaces': 'warn',
    'unicorn/no-for-loop': 'warn',
    'unicorn/no-hex-escape': 'warn',
    'unicorn/no-new-buffer': 'warn',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-zero-fractions': 'warn',
    'unicorn/numeric-separators-style': 'warn',
    'unicorn/prefer-add-event-listener': 'warn',
    'unicorn/prefer-array-find': 'warn',
    'unicorn/prefer-includes': 'warn',
    'unicorn/prefer-math-trunc': 'warn',
    'unicorn/prefer-modern-dom-apis': 'warn',
    'unicorn/prefer-negative-index': 'warn',
    'unicorn/prefer-number-properties': 'warn',
    'unicorn/prefer-optional-catch-binding': 'warn',
    'unicorn/prefer-query-selector': 'warn',
    'unicorn/prefer-reflect-apply': 'warn',
    'unicorn/prefer-set-has': 'warn',
    'unicorn/prefer-spread': 'warn',
    'unicorn/prefer-string-slice': 'warn',
    'unicorn/prefer-ternary': 'warn',
    'unicorn/prefer-type-error': 'warn',
    'unicorn/string-content': 'warn',
    'unicorn/throw-new-error': 'warn',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-object-as-default-parameter': 'off',
    'unicorn/prevent-abbreviations': 'off',
    // "unicorn/no-array-instanceof": "warn",
    // "unicorn/no-fn-reference-in-iterator": "off",
    // "unicorn/no-reduce": "off",
    // "unicorn/prefer-dataset": "warn",
    // "unicorn/prefer-event-key": "warn",
    // "unicorn/prefer-flat-map": "warn",
    // "unicorn/prefer-node-append": "warn",
    // "unicorn/prefer-node-remove": "warn",
    // "unicorn/prefer-replace-all": "warn",
    // "unicorn/prefer-starts-ends-with": "warn",
    // "unicorn/prefer-text-content": "warn",
    // "unicorn/prefer-trim-start-end": "warn",
    // duplicate "unicorn/prevent-abbreviations": "off",
    // duplicate "unicorn/throw-new-error": "warn",
    // "unicorn/regex-shorthand": "warn",
    // "unicorn/no-nested-ternary": "off",
    // "unicorn/number-literal-case": "off",
    //   // "comma-style": [
    //   //   "warn",
    //   //   "last"
    //   // ],
    //   // "comma-dangle": [
    //   //   "warn",
    //   //   "always-multiline"
    //   // ],
    //   /*
  },
  //   // "import/no-unresolved": "error",
  //   /*
  //   */
  //   //
  //   'prettier/prettier': ['off'],
  //   'arrow-body-style': 'off',
  //   'no-confusing-arrow': 'off',
  //   'prefer-arrow-callback': 'off',
  //   curly: ['warn', 'multi-line', 'consistent'],
  //   indent: ['off'],
  //   'linebreak-style': ['off'],
  //   quotes: ['off'],
  //   semi: ['off'],
  //   // "comma-dangle": [
  //   //   "warn",
  //   //   "only-multiline"
  //   // ],
  //   'lines-around-comment': 'off',
  //   'spaced-comment': 'warn',
  //   'max-len': 'off',
  //   // export function  /*eslint max-len: ["error", { "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\(" }]*/
  //   'no-mixed-operators': 'off',
  //   'no-tabs': 'off',
  //   'no-unexpected-multiline': 'off',
  //   // "quotes": [
  //   //   "warn",
  //   //   "single",
  //   //   {
  //   //     "avoidEscape": true,
  //   //     "allowTemplateLiterals": false
  //   //   }
  //   // ],

  //   /*
};

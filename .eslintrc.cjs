// This is a workaround for https://github.com/eslint/eslint/issues/3458
// require('@rushstack/eslint-config/patch/modern-module-resolution');
// /** @type { import("eslint").Linter.FlatConfig[] } */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // '@rushstack/eslint-config/profile/node',
    'plugin:@stylistic/disable-legacy',
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  plugins: [
    '@stylistic',
    'unicorn',
    'prettier',
    'simple-import-sort',
    'import',
    'jsdoc',
    '@rushstack/eslint-plugin',
    '@typescript-eslint',
  ],
  rules: {
    // ―――――――― eslint-config-prettier ―――――――――――――――――――――――――――――――
    // // +++ eslint-config-prettier +++
    'prettier/prettier': ['warn'],
    // 'quotes': ['off', 'single'],
    // 'indent': ['off', 2],
    // 'semi': ['off', 'always'],
    'unicorn/no-nested-ternary': 'off',
    'unicorn/number-literal-case': 'off',
    // +++ eslint-config-prettier +++
    // 🚫  deprecated
    // '@typescript-eslint/indent': ['off', 2],
    // '@typescript-eslint/quotes': 'off',
    // '@typescript-eslint/semi': 'off',
    // '@typescript-eslint/object-curly-spacing': 'off',
    // '@typescript-eslint/brace-style': 'off',
    // '@typescript-eslint/comma-dangle': 'off',
    // '@typescript-eslint/comma-spacing': 'off',
    // '@typescript-eslint/func-call-spacing': 'off',
    // '@typescript-eslint/keyword-spacing': 'off',
    // '@typescript-eslint/member-delimiter-style': 'off',
    // '@typescript-eslint/no-extra-parens': 'off',
    // '@typescript-eslint/no-extra-semi': 'off',
    // '@typescript-eslint/space-before-function-paren': 'off',
    // '@typescript-eslint/space-infix-ops': 'off',
    // '@typescript-eslint/type-annotation-spacing': 'off',
    // +++
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    //―― Supported Rules
    /*
    @typescript-eslint/eslint-plugin includes over 100 rules that detect best practice violations, bugs, and/or stylistic issues specifically for TypeScript code. See Configs for how to enable recommended rules using configs.
    */
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/ban-tslint-comment': 'warn',
    '@typescript-eslint/class-literal-property-style': 'warn',
    '@typescript-eslint/consistent-generic-constructors': 'warn',
    '@typescript-eslint/consistent-indexed-object-style': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/consistent-type-exports': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/method-signature-style': 'warn',
    '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'warn',
    '@typescript-eslint/no-duplicate-type-constituents': 'warn',
    '@typescript-eslint/no-dynamic-delete': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-extra-non-null-assertion': 'warn',
    '@typescript-eslint/no-import-type-side-effects': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-meaningless-void-operator': 'warn',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-useless-empty-export': 'warn',
    '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/prefer-function-type': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/prefer-namespace-keyword': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/prefer-regexp-exec': 'warn',
    '@typescript-eslint/prefer-return-this-type': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'warn',
    '@typescript-eslint/promise-function-async': 'warn',
    '@typescript-eslint/sort-type-constituents': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/parameter-properties': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-duplicate-enum-values': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-for-in-array': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-misused-new': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-mixed-enums': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    // '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-enum-initializers': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/prefer-literal-enum-member': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/unified-signatures': 'off',
    //―― Extension Rules
    /*
    In some cases, ESLint provides a rule itself, but it doesn't support TypeScript syntax; either it crashes, or it ignores the syntax, or it falsely reports against it. In these cases, we create what we call an extension rule; a rule within our plugin that has the same functionality, but also supports TypeScript.
    */
    //  🚫  deprecated
    // '@stylistic/ts/block-spacing': 'warn',
    // '@typescript-eslint/key-spacing': 'warn',
    // '@typescript-eslint/lines-around-comment': 'warn',
    // '@typescript-eslint/lines-between-class-members': 'warn',
    // '@typescript-eslint/padding-line-between-statements': 'warn',
    // '@typescript-eslint/space-before-blocks': 'warn',
    '@typescript-eslint/default-param-last': 'off',
    '@typescript-eslint/dot-notation': 'warn',
    '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/no-array-constructor': 'warn',
    '@typescript-eslint/no-dupe-class-members': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/no-invalid-this': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    '@typescript-eslint/no-loss-of-precision': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/no-restricted-imports': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/return-await': 'warn',
    'accessor-pairs': 'off',
    'array-callback-return': 'off',
    'arrow-body-style': 'off',
    'block-scoped-var': 'off',
    'camelcase': 'off',
    'capitalized-comments': 'off',
    'class-methods-use-this': 'off',
    'complexity': 'off',
    'consistent-return': 'off',
    'consistent-this': 'off',
    'constructor-super': 'error',
    'curly': 'warn',
    'default-case-last': 'off',
    'default-case': 'off',
    'default-param-last': 'off',
    'dot-notation': 'off',
    'eqeqeq': 'off',
    'for-direction': 'error',
    'func-name-matching': 'off',
    'func-names': 'off',
    'func-style': 'off',
    'getter-return': 'error',
    'grouped-accessor-pairs': 'off',
    'guard-for-in': 'off',
    'id-denylist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'init-declarations': 'off',
    'line-comment-position': 'off',
    'logical-assignment-operators': 'off',
    'max-classes-per-file': 'off',
    'max-depth': 'off',
    'max-lines-per-function': 'off',
    'max-lines': 'off',
    'max-nested-callbacks': 'off',
    'max-params': 'off',
    'max-statements': 'off',
    'multiline-comment-style': 'off',
    'new-cap': 'off',
    'no-alert': 'off',
    'no-array-constructor': 'off',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'off',
    'no-bitwise': 'off',
    'no-caller': 'off',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-console': 'off',
    'no-const-assign': 'error',
    'no-constant-binary-expression': 'off',
    'no-constant-condition': 'error',
    'no-constructor-return': 'off',
    'no-continue': 'off',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-div-regex': 'off',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'off',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'off',
    'no-else-return': 'off',
    'no-empty-character-class': 'error',
    'no-empty-function': 'off',
    'no-empty-pattern': 'error',
    'no-empty-static-block': 'off',
    'no-empty': 'error',
    'no-eq-null': 'off',
    'no-eval': 'off',
    'no-ex-assign': 'error',
    'no-extend-native': 'off',
    'no-extra-bind': 'off',
    'no-extra-boolean-cast': 'warn',
    'no-extra-label': 'off',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'off',
    'no-implied-eval': 'off',
    'no-import-assign': 'error',
    'no-inline-comments': 'off',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'off',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'off',
    'no-label-var': 'off',
    'no-labels': 'off',
    'no-lone-blocks': 'off',
    'no-lonely-if': 'off',
    'no-loop-func': 'off',
    'no-loss-of-precision': 'error',
    'no-magic-numbers': 'off',
    'no-misleading-character-class': 'error',
    'no-multi-assign': 'off',
    'no-multi-str': 'off',
    'no-negated-condition': 'off',
    'no-nested-ternary': 'off',
    'no-new-func': 'off',
    'no-new-native-nonconstructor': 'off',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'off',
    'no-new': 'off',
    'no-nonoctal-decimal-escape': 'error',
    'no-obj-calls': 'error',
    'no-octal-escape': 'off',
    'no-octal': 'error',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-promise-executor-return': 'off',
    'no-proto': 'off',
    'no-prototype-builtins': 'error',
    'no-redeclare': 'off',
    'no-regex-spaces': 'warn',
    'no-restricted-exports': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-imports': 'off',
    'no-restricted-properties': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-script-url': 'off',
    'no-self-assign': 'error',
    'no-self-compare': 'off',
    'no-sequences': 'off',
    'no-setter-return': 'error',
    'no-shadow-restricted-names': 'error',
    'no-shadow': 'off',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'off',
    'no-ternary': 'off',
    'no-this-before-super': 'error',
    'no-throw-literal': 'off',
    'no-undef-init': 'off',
    'no-undef': 'off',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'off',
    'no-unneeded-ternary': 'off',
    'no-unreachable-loop': 'off',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unused-expressions': 'off',
    'no-unused-labels': 'warn',
    'no-unused-private-class-members': 'off',
    'no-unused-vars': [
      'off',
      {
        ignoreRestSiblings: true,
      },
    ],
    'no-use-before-define': 'off',
    'no-useless-backreference': 'error',
    'no-useless-call': 'off',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'off',
    'no-useless-concat': 'off',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'error',
    'no-useless-rename': 'off',
    'no-useless-return': 'off',
    'no-var': 'warn',
    'no-void': 'off',
    'no-warning-comments': 'off',
    'no-with': 'error',
    'object-shorthand': 'off',
    'one-var': 'off',
    'operator-assignment': 'off',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-destructuring': 'off',
    'prefer-exponentiation-operator': 'warn',
    'prefer-named-capture-group': 'off',
    'prefer-numeric-literals': 'off',
    'prefer-object-has-own': 'off',
    'prefer-object-spread': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-regex-literals': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'prefer-template': 'warn',
    'radix': 'off',
    'require-atomic-updates': 'off',
    'require-await': 'off',
    'require-unicode-regexp': 'off',
    'require-yield': 'error',
    'sort-keys': 'off',
    'sort-vars': 'off',
    'strict': 'off',
    'symbol-description': 'off',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'vars-on-top': 'off',
    'yoda': ['warn', 'always', { onlyEquality: true }],
    // 'array-bracket-newline': 'off',
    // 'array-bracket-spacing': 'off',
    // 'array-element-newline': 'off',
    // 'arrow-parens': 'off',
    // 'arrow-spacing': 'off',
    // 'block-spacing': 'off',
    // 'brace-style': 'off',
    // 'comma-dangle': 'off',
    // 'comma-spacing': 'off',
    // 'comma-style': 'off',
    // 'computed-property-spacing': 'off',
    // 'dot-location': 'off',
    // 'eol-last': 'off',
    // 'func-call-spacing': 'off',
    // 'function-call-argument-newline': 'off',
    // 'function-paren-newline': 'off',
    // 'generator-star-spacing': 'off',
    // 'implicit-arrow-linebreak': 'off',
    // 'jsx-quotes': 'off',
    // 'key-spacing': 'off',
    // 'keyword-spacing': 'off',
    // 'linebreak-style': 'off',
    // 'lines-around-comment': 'off',
    // 'lines-between-class-members': 'off',
    // 'max-len': 'off',
    // 'max-statements-per-line': 'off',
    // 'multiline-ternary': 'off',
    // 'new-parens': 'off',
    // 'newline-per-chained-call': 'off',
    // 'no-confusing-arrow': 'off',
    // 'no-extra-parens': 'off',
    // 'no-extra-semi': 'warn',
    // 'no-floating-decimal': 'warn',
    // 'no-mixed-operators': 'off',
    // 'no-mixed-spaces-and-tabs': 'error',
    // 'no-multi-spaces': 'off',
    // 'no-multiple-empty-lines': 'off',
    // 'no-new-object': 'off',
    // 'no-return-await': 'off',
    // 'no-tabs': 'off',
    // 'no-trailing-spaces': 'off',
    // 'no-whitespace-before-property': 'off',
    // 'nonblock-statement-body-position': 'off',
    // 'object-curly-newline': 'off',
    // 'object-curly-spacing': 'off',
    // 'object-property-newline': 'off',
    // 'one-var-declaration-per-line': 'warn',
    // 'operator-linebreak': 'off',
    // 'padded-blocks': 'off',
    // 'padding-line-between-statements': 'off',
    // 'quote-props': ['error', 'consistent-as-needed'],
    // 'rest-spread-spacing': 'off',
    // 'semi-spacing': 'off',
    // 'semi-style': ['warn', 'last'],
    // 'space-before-blocks': 'off',
    // 'space-before-function-paren': 'off',
    // 'space-in-parens': 'off',
    // 'space-infix-ops': 'off',
    // 'space-unary-ops': 'off',
    // 'spaced-comment': 'off',
    // 'switch-colon-spacing': 'off',
    // 'template-curly-spacing': 'off',
    // 'template-tag-spacing': 'off',
    // 'unicode-bom': 'off',
    // 'wrap-iife': 'off',
    // 'wrap-regex': 'off',
    // 'yield-star-spacing': 'off',

    // ―――――――― simple-import-sort ―――――――――――――――――――――――――――――――――――
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/naming-convention': 'off',
    // ―――――――― eslint-plugin-import ―――――――――――――――――――――――――――――――――
    // /* Static analysis*/
    'import/no-self-import': 'error',
    'import/namespace': 'error',
    'import/no-useless-path-segments': 'warn',
    'import/no-absolute-path': 'error',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/default': 'off',
    'import/no-restricted-paths': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-internal-modules': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'import/no-cycle': 'off',
    'import/no-relative-parent-imports': 'off',
    // /* Helpful warnings */
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unused-modules': 'error',
    // /* Style guide*/
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-namespace': 'off',
    //  "import/order": 'off', // ―3 managed with simple-import-sort
    'import/exports-last': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/max-dependencies': 'off',
    'import/no-unassigned-import': 'off',
    'import/no-named-default': 'off',
    'import/no-default-export': 'off',
    'import/no-named-export': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/group-exports': 'off',
    'import/dynamic-import-chunkname': 'off',
    // /* Module systems*/
    'import/no-amd': 'off',
    'import/no-commonjs': 'off',
    'import/no-nodejs-modules': 'off',
    'import/unambiguous': 'off',
    // // ―――――――― unicorn ――――――――――――――――――――――――――――――――――――――――――――――
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/better-regex': 'warn',
    'unicorn/catch-error-name': 'warn',
    'unicorn/custom-error-definition': 'warn',
    'unicorn/escape-case': 'warn',
    'unicorn/explicit-length-check': 'off',
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
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/error-message': 'error',
    'unicorn/expiring-todo-comments': 'error',
    'unicorn/no-keyword-prefix': 'error',
    'unicorn/no-unused-properties': 'error',
    'unicorn/no-null': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-object-as-default-parameter': 'off',
    //% Description: Enforce linebreaks after opening and before closing array brackets
    //? Fixable: whitespace
    '@stylistic/array-bracket-newline': 'warn',
    //% Description: Enforce consistent spacing inside array brackets
    //? Fixable: whitespace
    '@stylistic/array-bracket-spacing': 'warn',
    //% Description: Enforce line breaks after each array element
    //? Fixable: whitespace
    '@stylistic/array-element-newline': 'warn',
    //% Description: Require parentheses around arrow function arguments
    //? Fixable: code
    '@stylistic/arrow-parens': 'warn',
    //% Description: Enforce consistent spacing before and after the arrow in arrow functions
    //? Fixable: whitespace
    '@stylistic/arrow-spacing': 'warn',
    //% Description: Disallow or enforce spaces inside of blocks after opening block and before closing block
    //? Fixable: whitespace
    '@stylistic/block-spacing': 'warn',
    //% Description: Enforce consistent brace style for blocks
    //? Fixable: whitespace
    '@stylistic/brace-style': 'warn',
    //% Description: Require or disallow trailing commas
    //? Fixable: code
    '@stylistic/comma-dangle': 'warn',
    //% Description: Enforce consistent spacing before and after commas
    //? Fixable: whitespace
    '@stylistic/comma-spacing': 'warn',
    //% Description: Enforce consistent comma style
    //? Fixable: code
    '@stylistic/comma-style': 'warn',
    //% Description: Enforce consistent spacing inside computed property brackets
    //? Fixable: whitespace
    '@stylistic/computed-property-spacing': 'warn',
    //% Description: Enforce consistent newlines before and after dots
    //? Fixable: code
    '@stylistic/dot-location': 'warn',
    //% Description: Require or disallow newline at the end of files
    //? Fixable: whitespace
    '@stylistic/eol-last': 'warn',
    //% Description: Require or disallow spacing between function identifiers and their invocations. Alias of `function-call-spacing`.
    //? Fixable: whitespace
    '@stylistic/func-call-spacing': 'warn',
    //% Description: Enforce line breaks between arguments of a function call
    //? Fixable: whitespace
    '@stylistic/function-call-argument-newline': 'warn',
    //% Description: Require or disallow spacing between function identifiers and their invocations
    //? Fixable: whitespace
    '@stylistic/function-call-spacing': 'warn',
    //% Description: Enforce consistent line breaks inside function parentheses
    //? Fixable: whitespace
    '@stylistic/function-paren-newline': 'warn',
    //% Description: Enforce consistent spacing around `*` operators in generator functions
    //? Fixable: whitespace
    '@stylistic/generator-star-spacing': 'warn',
    //% Description: Enforce the location of arrow function bodies
    //? Fixable: whitespace
    '@stylistic/implicit-arrow-linebreak': 'warn',
    //% Description: Enforce consistent indentation
    //? Fixable: whitespace
    '@stylistic/indent': 'warn',
    //% Description: Indentation for binary operators
    //? Fixable: whitespace
    '@stylistic/indent-binary-ops': 'warn',
    //% Description: Enforce closing bracket location in JSX
    //? Fixable: code
    '@stylistic/jsx-closing-bracket-location': 'warn',
    //% Description: Enforce closing tag location for multiline JSX
    //? Fixable: whitespace
    '@stylistic/jsx-closing-tag-location': 'warn',
    //% Description: Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes
    //? Fixable: code
    '@stylistic/jsx-curly-brace-presence': 'warn',
    //% Description: Enforce consistent linebreaks in curly braces in JSX attributes and expressions
    //? Fixable: whitespace
    '@stylistic/jsx-curly-newline': 'warn',
    //% Description: Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
    //? Fixable: code
    '@stylistic/jsx-curly-spacing': 'warn',
    //% Description: Enforce or disallow spaces around equal signs in JSX attributes
    //? Fixable: code
    '@stylistic/jsx-equals-spacing': 'warn',
    //% Description: Enforce proper position of the first property in JSX
    //? Fixable: code
    '@stylistic/jsx-first-prop-new-line': 'warn',
    //% Description: Enforce JSX indentation
    //? Fixable: whitespace
    '@stylistic/jsx-indent': 'warn',
    //% Description: Enforce props indentation in JSX
    //? Fixable: code
    '@stylistic/jsx-indent-props': 'warn',
    //% Description: Enforce maximum of props on a single line in JSX
    //? Fixable: code
    '@stylistic/jsx-max-props-per-line': 'warn',
    //% Description: Require or prevent a new line after jsx elements and expressions.
    //? Fixable: code
    '@stylistic/jsx-newline': 'warn',
    //% Description: Require one JSX element per line
    //? Fixable: whitespace
    '@stylistic/jsx-one-expression-per-line': 'warn',
    //% Description: Disallow multiple spaces between inline JSX props
    //? Fixable: code
    '@stylistic/jsx-props-no-multi-spaces': 'warn',
    //% Description: Enforce the consistent use of either double or single quotes in JSX attributes
    //? Fixable: whitespace
    '@stylistic/jsx-quotes': 'warn',
    //% Description: Disallow extra closing tags for components without children
    //? Fixable: code
    '@stylistic/jsx-self-closing-comp': 'warn',
    //% Description: Enforce props alphabetical sorting
    //? Fixable: code
    '@stylistic/jsx-sort-props': 'warn',
    //% Description: Enforce whitespace in and around the JSX opening and closing brackets
    //? Fixable: whitespace
    '@stylistic/jsx-tag-spacing': 'warn',
    //% Description: Disallow missing parentheses around multiline JSX
    //? Fixable: code
    '@stylistic/jsx-wrap-multilines': 'warn',
    //% Description: Enforce consistent spacing between keys and values in object literal properties
    //? Fixable: whitespace
    '@stylistic/key-spacing': 'warn',
    //% Description: Enforce consistent spacing before and after keywords
    //? Fixable: whitespace
    '@stylistic/keyword-spacing': 'warn',
    //% Description: Enforce consistent linebreak style
    //? Fixable: whitespace
    '@stylistic/linebreak-style': 'warn',
    //% Description: Require empty lines around comments
    //? Fixable: whitespace
    '@stylistic/lines-around-comment': 'warn',
    //% Description: Require or disallow an empty line between class members
    //? Fixable: whitespace
    '@stylistic/lines-between-class-members': 'warn',
    //% Description: Require a specific member delimiter style for interfaces and type literals
    //? Fixable: whitespace
    '@stylistic/member-delimiter-style': 'warn',
    //% Description: Enforce newlines between operands of ternary expressions
    //? Fixable: whitespace
    '@stylistic/multiline-ternary': 'warn',
    //% Description: Enforce or disallow parentheses when invoking a constructor with no arguments
    //? Fixable: code
    '@stylistic/new-parens': 'warn',
    //% Description: Require a newline after each call in a method chain
    //? Fixable: whitespace
    '@stylistic/newline-per-chained-call': 'warn',
    //% Description: Disallow arrow functions where they could be confused with comparisons
    //? Fixable: code
    '@stylistic/no-confusing-arrow': 'warn',
    //% Description: Disallow unnecessary parentheses
    //? Fixable: code
    '@stylistic/no-extra-parens': 'warn',
    //% Description: Disallow unnecessary semicolons
    //? Fixable: code
    '@stylistic/no-extra-semi': 'warn',
    //% Description: Disallow leading or trailing decimal points in numeric literals
    //? Fixable: code
    '@stylistic/no-floating-decimal': 'warn',
    //% Description: Disallow multiple spaces
    //? Fixable: whitespace
    '@stylistic/no-multi-spaces': 'warn',
    //% Description: Disallow multiple empty lines
    //? Fixable: whitespace
    '@stylistic/no-multiple-empty-lines': 'warn',
    //% Description: Disallow trailing whitespace at the end of lines
    //? Fixable: whitespace
    '@stylistic/no-trailing-spaces': 'warn',
    //% Description: Disallow whitespace before properties
    //? Fixable: whitespace
    '@stylistic/no-whitespace-before-property': 'warn',
    //% Description: Enforce the location of single-line statements
    //? Fixable: whitespace
    '@stylistic/nonblock-statement-body-position': 'warn',
    //% Description: Enforce consistent line breaks after opening and before closing braces
    //? Fixable: whitespace
    '@stylistic/object-curly-newline': 'warn',
    //% Description: Enforce consistent spacing inside braces
    //? Fixable: whitespace
    '@stylistic/object-curly-spacing': 'warn',
    //% Description: Enforce placing object properties on separate lines
    //? Fixable: whitespace
    '@stylistic/object-property-newline': 'warn',
    //% Description: Require or disallow newlines around variable declarations
    //? Fixable: whitespace
    '@stylistic/one-var-declaration-per-line': 'warn',
    //% Description: Enforce consistent linebreak style for operators
    //? Fixable: code
    '@stylistic/operator-linebreak': 'warn',
    //% Description: Require or disallow padding within blocks
    //? Fixable: whitespace
    '@stylistic/padded-blocks': 'warn',
    //% Description: Require or disallow padding lines between statements
    //? Fixable: whitespace
    '@stylistic/padding-line-between-statements': 'warn',
    //% Description: Require quotes around object literal property names
    //? Fixable: code
    '@stylistic/quote-props': 'warn',
    //% Description: Enforce the consistent use of either backticks, double, or single quotes
    //? Fixable: code
    '@stylistic/quotes': 'warn',
    //% Description: Enforce spacing between rest and spread operators and their expressions
    //? Fixable: whitespace
    '@stylistic/rest-spread-spacing': 'warn',
    //% Description: Require or disallow semicolons instead of ASI
    //? Fixable: code
    '@stylistic/semi': 'warn',
    //% Description: Enforce consistent spacing before and after semicolons
    //? Fixable: whitespace
    '@stylistic/semi-spacing': 'warn',
    //% Description: Enforce location of semicolons
    //? Fixable: whitespace
    '@stylistic/semi-style': 'warn',
    //% Description: Enforce consistent spacing before blocks
    //? Fixable: whitespace
    '@stylistic/space-before-blocks': 'warn',
    //% Description: Enforce consistent spacing before `function` definition opening parenthesis
    //? Fixable: whitespace
    '@stylistic/space-before-function-paren': 'warn',
    //% Description: Enforce consistent spacing inside parentheses
    //? Fixable: whitespace
    '@stylistic/space-in-parens': 'warn',
    //% Description: Require spacing around infix operators
    //? Fixable: whitespace
    '@stylistic/space-infix-ops': 'warn',
    //% Description: Enforce consistent spacing before or after unary operators
    //? Fixable: whitespace
    '@stylistic/space-unary-ops': 'warn',
    //% Description: Enforce consistent spacing after the `//` or `/*` in a comment
    //? Fixable: whitespace
    '@stylistic/spaced-comment': 'warn',
    //% Description: Enforce spacing around colons of switch statements
    //? Fixable: whitespace
    '@stylistic/switch-colon-spacing': 'warn',
    //% Description: Require or disallow spacing around embedded expressions of template strings
    //? Fixable: whitespace
    '@stylistic/template-curly-spacing': 'warn',
    //% Description: Require or disallow spacing between template tags and their literals
    //? Fixable: whitespace
    '@stylistic/template-tag-spacing': 'warn',
    //% Description: Require consistent spacing around type annotations
    //? Fixable: whitespace
    '@stylistic/type-annotation-spacing': 'warn',
    //% Description: Enforces consistent spacing inside TypeScript type generics
    //? Fixable: whitespace
    '@stylistic/type-generic-spacing': 'warn',
    //% Description: Expect space before the type declaration in the named tuple
    //? Fixable: whitespace
    '@stylistic/type-named-tuple-spacing': 'warn',
    //% Description: Require parentheses around immediate `function` invocations
    //? Fixable: code
    '@stylistic/wrap-iife': 'warn',
    //% Description: Require parenthesis around regex literals
    //? Fixable: code
    '@stylistic/wrap-regex': 'warn',
    //% Description: Require or disallow spacing around the `*` in `yield*` expressions
    //? Fixable: whitespace
    '@stylistic/yield-star-spacing': 'warn',
    //& Description: Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
    '@stylistic/jsx-child-element-spacing': 'error',
    //& Description: Enforce PascalCase for user-defined JSX components
    '@stylistic/jsx-pascal-case': 'error',
    //& Description: Enforce a maximum line length
    '@stylistic/max-len': 'error',
    //& Description: Enforce a maximum number of statements allowed per line
    '@stylistic/max-statements-per-line': 'error',
    //& Description: Disallow mixed binary operators
    '@stylistic/no-mixed-operators': 'error',
    //& Description: Disallow mixed spaces and tabs for indentation
    '@stylistic/no-mixed-spaces-and-tabs': 'error',
    //& Description: Disallow all tabs
    '@stylistic/no-tabs': 'error',
  },
};

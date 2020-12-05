module.exports = {
  /** 
    * ESLint: http://eslint.org/docs/user-guide/configuring
    */

  // "env:" supplies predefined global variables
  env: {
    node: true,
    mocha: true,
    es6: true,
    mongo: true,
    commonjs: true,
    es2021: true,
  },

  globals: {
    supertest: true,
    expect: true
  },

  // our configuration extends the recommended base configuration, & prettier
  extends: [
    "eslint:recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/babel",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard",
    "prettier/unicorn",
    "prettier/vue",
  ],

  parserOptions: {
    ecmaVersion: 12,
  },

  //ESLint rules: Severity Levels: off = 0 | warn = 1 | error = 2
  rules: {
    "eqeqeq": "warn",              //prefer strict equality `===`
    "no-console": "warn",          //allows but warn about console like `console.log()`
    "no-unused-vars": ["warn", { "varsIgnorePattern": "^_" }],
    "no-eval": "error",            //disallows `eval()` usage
    "indent": ["error", 2],        //enforce 2 space indents (not tabs)        
    "semi": ["error", "always"],   //enforce semi-colon usage
    "quotes": [0]
  },
};

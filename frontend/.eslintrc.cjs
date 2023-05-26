module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "svelte3"
    ],
    "ignorePatterns": [
        "dist/"
    ],
    "overrides": [{
        "files": ['**/*.svelte'],
        "processor": "svelte3/svelte3"
    }],
    "rules": {
    }
}

module.exports = {
    extends: [
        '../../.eslintrc.cjs',
        '../../config/eslint/vue.cjs',
        '../../config/eslint/html.cjs',
    ],
    ignorePatterns: [
        '!**/*'
    ],
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
}

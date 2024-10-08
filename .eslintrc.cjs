module.exports = {
    root: true,
    ignorePatterns: [
        // '**/*',
    ],
    plugins: [
        '@nx'
    ],
    extends: [
        './config/eslint/general.cjs'
    ],
    env: {
        browser: true,
        node: true,
        es2022: true
    },
    overrides: [
        {
            files: [ '*.ts', '*.tsx', '*.js', '*.jsx', '*.vue' ],
            rules: {
                '@nx/enforce-module-boundaries': [
                    'error',
                    {
                        enforceBuildableLibDependency: true,
                        allow: [],
                        depConstraints: [
                            {
                                sourceTag: '*',
                                onlyDependOnLibsWithTags: [ '*' ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            files: [ '*.ts', '*.tsx' ],
            extends: [ 'plugin:@nx/typescript' ],
            rules: {}
        },
        {
            files: [ '*.js', '*.cjs', '*.jsx' ],
            extends: [ 'plugin:@nx/javascript' ],
            rules: {}
        }
    ]
}

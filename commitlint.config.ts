import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'
// import { readCachedProjectGraph } from '@nx/devkit'

// const getNxProjects = () => Object.keys(readCachedProjectGraph().nodes)

export default {
    extends: [ '@commitlint/config-conventional', '@commitlint/config-nx-scopes' ],
    rules: {
        // Known bug: https://github.com/conventional-changelog/commitlint/issues/3613
        // 'scope-enum': () => [ RuleConfigSeverity.Error, 'always', getNxProjects() ],
        'scope-enum': () => [ RuleConfigSeverity.Disabled ],
    },
} satisfies UserConfig

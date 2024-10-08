import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'
import { readCachedProjectGraph } from '@nx/devkit'

const getNxProjects = () => Object.keys(readCachedProjectGraph().nodes)

export default {
    extends: [ '@commitlint/config-conventional', '@commitlint/config-nx-scopes' ],
    rules: {
        'scope-enum': () => [ RuleConfigSeverity.Error, 'always', getNxProjects() ],
    },
} satisfies UserConfig

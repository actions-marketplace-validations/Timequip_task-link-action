import * as core from '@actions/core'
import * as github from '@actions/github'

const projectKey = core.getInput('project-key').trim()
const context = github.context
const pr = context.payload.pull_request
const text = [pr?.title, pr?.body, pr?.head?.ref].filter(Boolean).join('\n')
const pattern = projectKey ? new RegExp(`(?<![A-Z0-9])${projectKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-[1-9][0-9]*(?![0-9])`, 'gi') : /(?<![A-Z0-9])[A-Z]+-[1-9][0-9]*(?![0-9])/gi
const keys = [...new Set((text.match(pattern) || []).map((key) => key.toUpperCase()))]
core.setOutput('task-keys', keys.join(','))
core.setOutput('linked-count', String(keys.length))
if (!keys.length) core.warning('No Timequip task key found. Add e.g. TQ-123 to the pull request title, description, or branch name.')
await core.summary.addHeading('Timequip').addRaw(keys.length ? `Linked tasks: ${keys.join(', ')}` : 'No task key linked.').write()

import * as core from '@actions/core'
import * as github from '@actions/github'


async function run(): Promise<void> {
  try {
    const pr_number = core.getInput('pr_number')
    
    const token = core.getInput('GITHUB_TOKEN')
    const octokit = github.getOctokit(token)
    
    const owner: string = github.context.repo.owner
    const repo: string = github.context.repo.repo

    const { data: pullRequest } = await octokit.rest.pulls.get({ owner:owner, repo:repo , pull_number: parseInt(pr_number)})

    core.setOutput('pr_state: ', pullRequest.state)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

import * as core from '@actions/core'
import * as github from '@actions/github'
import {wait} from './wait'


async function run(): Promise<void> {
  try {
    const pr_number: string = core.getInput('pr_number')
    
    const token: string = ${{ secrets.GITHUB_TOKEN }}
    const octokit = github.getOctokit(token)
    
    const owner: string = github.context.repo.owner
    const repo: string = github.context.repo.repo

    const res = octokit.rest.pulls.get({
      owner,
      repo,
      pr_number,
    });

    core.setOutput('PR state is: ', res.state)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

const fs = require('fs');
const json2md = require('json2md');
const moment = require('moment');
const core = require('@actions/core');

const main = async() => {
  try {
    const repository = core.getInput('repository', {required: true});
    const prNumber = core.getInput('pr-number', {required: true});
    const fileName = core.getInput('file-name', {required: true});
    const environment = core.getInput('environment', {required: true});
    const token = process.env.GITHUB_TOKEN;

    const tfPlan = fs.readFileSync(fileName, 'utf8');
    const tfJSON = JSON.parse(tfPlan);
    
    const commentMD = json2md([
      { h3: `Terraform Plan Summary - ${environment}` },
      { blockquote: `Terraform Plan Summary Report - ${moment.utc().format('YYYY-MM-DD HH:mm:ss')}` },
      { hr: "" },
      { h4: "Resources Change Summary List" },
      { table: 
        { headers: ["Address", "Mode", "Type", "Name", "Actions"],
        rows: tfJSON.resource_changes.map(resource => 
          [`\`${resource.address}\``, `\`${resource.mode}\``, `\`${resource.type}\``, `\`${resource.name}\``, resource.change.actions.join(', ')]
        ),
      }},
    ]);

    const octokit = new github.getOctokit(token);
    const prComment = octokit.rest.pulls.createReviewComment({
      owner: repository.split('/')[0],
      repo: repository.split('/')[1],
      pull_number: prNumber,
      body: commentMD,
    });
    console.log(prComment);
  } catch(error) {
    console.log(error);
  }
}

main();

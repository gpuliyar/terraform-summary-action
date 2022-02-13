# Terraform Summary Report Action
Github Custom Action to generate a summary report of all the resources and its change state and update the PR as a comment

## Inputs

Name | Description | Required
--- | --- | ---
`repository` | Git Repository name | `true`
`pr-number` | PR number in the Git Repository | `true`
`environment` | Deployment environment name | `true`
`file-name` | Terraform json report file name | `true`

## Outputs

Name | Description
--- | ---
`commit-id` | Reference to the commit id to fetch the terraform summary report from the pull request

## Example Usage

```
jobs:
  terraform-summary-action:
    runs-on: ubuntu-latest
    steps:
    - name: Set Terraform Summary Report
        uses: gpuliyar/terraform-summary-action@v1.0.0
        with:
          # Repository name (Mandatory)
          repository: gpuliyar/awesome-project

          # PR Number  (Mandatory)
          pr-number: 101

          # Environment - name of the deployment environment. 
          # Possible values - production, staging, uat, test, other, etc.
          # Default value - staging
          environment: production

          # Terraform json report file name to parse and generate the summary report.
          # Default value - tfplan-show.json
          file-name: tfplan-show.json
        env:
          # Github Token to access the pull request and update a comment to it.
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> `GITHUB_TOKEN` required to make necessary API calls to Github to set the Context and the relevant Status in the PR

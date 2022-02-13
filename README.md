# Terraform Summary Report Action
Github Custom Action to generate a summary report of all the resources and its change state and update the PR as a comment

## Inputs

Name | Description | Required
--- | --- | ---
`file-name` | Terraform json report file name | `true`

# Example Usage

```
jobs:
  terraform-summary-action:
    runs-on: ubuntu-latest
    steps:
    - name: Set Terraform Summary Report
        uses: gpuliyar/terraform-summary-action@v1.0.0
        with:
          # Terraform json report file name to parse and generate the summary report.
          # Default value - tfplan-show.json
          file-name: tfplan-show.json
```

> `GITHUB_TOKEN` required to make necessary API calls to Github to set the Context and the relevant Status in the PR

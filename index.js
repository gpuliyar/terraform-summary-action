const fs = require('fs');
const moment = require('moment');
const core = require('@actions/core');

const main = async() => {
  try {
    const fileName = core.getInput('file-name', {required: true});
    const tfPlan = fs.readFileSync(fileName, 'utf8');
    console.log(tfPlan);
    const tfJSON = JSON.parse(tfPlan);
    const tfPlanRows = tfJSON.resource_changes.map(resource => 
      [resource.address, resource.mode, resource.type, resource.name, resource.change.actions.join(', ')]
    ).sort((a, b) => a[4].localeCompare(b[4]) ? 1 : -1);

    console.log('Terraform Plan Summary:');
    console.log(`  Terraform Plan Summary Report - ${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`);
    console.log('--------------------------------------------------------------------------------');
    console.log('Resources Change Summary List');
    console.log('--------------------------------------------------------------------------------');
    tfPlanRows.forEach(element => {
      console.log(element.join('\t'));
    });
  } catch(error) {
    console.log(error);
  }
}

main();

const fs = require('fs');
const moment = require('moment');
const core = require('@actions/core');

const main = async() => {
  try {
    const fileName = core.getInput('file-name', {required: true});
    const tfPlan = fs.readFileSync(fileName, 'utf8');
    const tfJSON = JSON.parse(tfPlan);
    const tfPlanRows = tfJSON.resource_changes.map(resource => 
      [resource.address, resource.mode, resource.type, resource.name, resource.change.actions.join(', ')]
    );
    const addressMaxLength = Math.max(...tfPlanRows.map(row => row[0].length));
    const modeMaxLength = Math.max(...tfPlanRows.map(row => row[1].length));
    const typeMaxLength = Math.max(...tfPlanRows.map(row => row[2].length));
    const nameMaxLength = Math.max(...tfPlanRows.map(row => row[3].length));
    const actionMaxLength = Math.max(...tfPlanRows.map(row => row[4].length));

    console.log(`Terraform Plan Summary Report - ${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`);
    console.log('Resources Change Summary List');

    console.log("-".repeat(addressMaxLength + modeMaxLength + typeMaxLength + nameMaxLength + actionMaxLength + 25));
    console.log(`>>> ${'Address'.padEnd(addressMaxLength + 5)} | ${'Mode'.padEnd(modeMaxLength + 5)} | ${'Type'.padEnd(typeMaxLength + 5)} | ${'Name'.padEnd(nameMaxLength + 5)} | Actions`);
    console.log("-".repeat(addressMaxLength + modeMaxLength + typeMaxLength + nameMaxLength + actionMaxLength + 25));

    tfPlanRows.forEach(element => {
      console.log(`${element[0].padEnd(addressMaxLength + 5, '.')} | ${element[1].padEnd(modeMaxLength + 5, '.')} | ${element[2].padEnd(typeMaxLength + 5, '.')} | ${element[3].padEnd(nameMaxLength + 5, '.')} | ${element[4]}`);
    });

    console.log("-".repeat(addressMaxLength + modeMaxLength + typeMaxLength + nameMaxLength + actionMaxLength + 25));
  } catch(error) {
    console.log(error);
  }
}

main();

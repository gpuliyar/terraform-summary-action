const fs = require('fs');
const moment = require('moment');
const colors = require('colors');
const core = require('@actions/core');

const main = async() => {
  try {
    const fileName = core.getInput('terraform-plan-file', { required: true });
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
    const totalMaxLength = addressMaxLength + modeMaxLength + typeMaxLength + nameMaxLength + actionMaxLength;

    console.log(`\n\nTerraform Plan Summary Report - ${moment.utc().format('YYYY-MM-DD HH:mm:ss')}`);
    console.log('Resources Change Summary List\n');

    console.log("-".repeat(totalMaxLength + 40));
    console.log(`${'Address'.padEnd(addressMaxLength + 5)} | ${'Mode'.padEnd(modeMaxLength + 5)} | ${'Type'.padEnd(typeMaxLength + 5)} | ${'Name'.padEnd(nameMaxLength + 5)} | Actions`);
    console.log("-".repeat(totalMaxLength + 40));

    tfPlanRowsSorted.forEach(element => {
      const logStr = `${element[0].padEnd(addressMaxLength + 5, '.')} | ${element[1].padEnd(modeMaxLength + 5, '.')} | ${element[2].padEnd(typeMaxLength + 5, '.')} | ${element[3].padEnd(nameMaxLength + 5, '.')} | ${element[4]}`

      if (element[4].contains('no-op')) {
        console.log(logStr.blue);
      } else if (element[4].contains('destroy') || element[4].contains('delete')) {
        console.log(logStr.red);
      } else if (element[4].contains('update') || element[4].contains('replace')) {
        console.log(logStr.yellow);
      } else {
        console.log(logStr.green);
      }
    });

    console.log("-".repeat(totalMaxLength + 40));
  } catch(error) {
    console.log(error);
  }
}

main();

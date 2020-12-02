//consuming dependencies
const inquirer = require('inquirer');
const fs = require('fs');


function runApp(){
    //object containing task details (the task to be undertaken and the date of commencement/execution)
    const taskDetails = {};

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'task',
            message: 'What task do you want to undertake, boss?'
        }
    ])
    .then(answer => {
        taskDetails.task = answer.task;
        return inquirer.prompt([
            {
                type: 'input',
                name: 'date',
                message: 'When do you want to commence/execute the task, boss?'
            }
        ]);
    })
    .then(answer => {
        taskDetails.date = answer.date;

        //storing data (object) in schedule.json file
        const data = JSON.stringify(taskDetails, null, 2);
        fs.appendFileSync('schedule.json', data);

        
        //Ask if user wants to store more data
        return inquirer.prompt([
            {
                type: 'confirm',
                name: 'reply',
                message: 'Do you want to make another entry, boss?'
            }
        ]);
    })
    .then(answer => {
        if(typeof answer.reply == 'boolean'){
            if(answer.reply == true){
                runApp();
            }else{
                return
            }
        }else{
            console.log('Oops! That was an invalid response. Enter "Y" or "N"');
            return
        }
    })
}

runApp();


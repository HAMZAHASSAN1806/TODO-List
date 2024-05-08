#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
console.log(chalk.blueBright("      WLCOME TO TODO LIST      "));
while (condition) {
    let answer = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: chalk.cyan("Select an operation that you use want to do"),
            choices: ["1:ADD", "2:UPDATE", "3:DELETE", "4:VIEW", "5:EXIT"],
        }
    ]);
    //ADD
    if (answer.select === "1:ADD") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: chalk.cyan("What you want to add to do list"),
            validate: function (input) {
                if (input.trim() == "") {
                    return chalk.red("ERROR: Please enter a non-empty item");
                }
                return true;
            }
        });
        if (addTodo.todo.trim() !== "") {
            todos.push(addTodo.todo);
            todos.forEach(todo => console.log(todo));
        }
    }
    //UPDATE
    if (answer.select === "2:UPDATE") {
        let updateTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: chalk.magentaBright("Select an item that you want update to do"),
            choices: todos.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: chalk.magentaBright("What you want to add to do list this time"),
        });
        let newTodo = todos.filter(val => val !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    //DELETE
    if (answer.select === "3:DELETE") {
        let deleteTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: chalk.redBright("Select an item that you want delete to do"),
            choices: todos.map(item => item)
        });
        let newTodo = todos.filter(val => val !== deleteTodo.todo);
        todos = [...newTodo];
        todos.forEach(todo => console.log(todo));
    }
    //VIEW
    if (answer.select === "4:VIEW") {
        if (todos.length === 0) {
            console.log(chalk.yellowBright("You dont have any list"));
        }
        else {
            console.log(chalk.yellowBright("Here is available view in the list"));
            todos.forEach(todo => console.log(todo));
        }
    }
    //EXIT
    if (answer.select === "5:EXIT") {
        console.log(chalk.greenBright("    <<<<   EXITING PROGRAM   >>>>  "));
        condition = false;
    }
}
//END

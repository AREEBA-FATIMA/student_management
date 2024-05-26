#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


class Student {
    static counter: number = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;
    totalFeesPaid: number;
    totalFeesRemaining: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
        this.totalFeesPaid = 0;
        this.totalFeesRemaining = 0;
    }

    enrollCourse(course: string, fee: number) {
        if (this.balance >= fee) {
            this.courses.push(course);
            this.totalFeesRemaining += fee;

            console.log(chalk.green(`${chalk.bold(this.name)} has been enrolled in ${chalk.bold(course)} successfully!`));
            console.log(chalk.blue("Now please pay fees"));

            return true;
        } else {
            console.log(chalk.red(`Insufficient balance to enroll in ${chalk.bold(course)}. Required: ${chalk.yellow(fee)}Rs, Available: ${chalk.yellow(this.balance)}Rs.`));
            return false;
        }
    }

    viewBalance() {
        console.log(`Balance for ${chalk.bold(this.name)}: ${chalk.yellow(this.balance)}Rs`);
    }

    payFees(amount: number) {
        if (amount > 0) {
            if (amount <= this.balance) {
                if (amount <= this.totalFeesRemaining) {
                    this.balance -= amount;
                    this.totalFeesPaid += amount;
                    this.totalFeesRemaining -= amount;

                    console.log(chalk.green(`${chalk.yellow(amount)}Rs fees paid successfully for ${chalk.bold(this.name)}`));
                } else {
                    console.log(chalk.red(`The amount exceeds the remaining fees. Total Fees Remaining: ${chalk.yellow(this.totalFeesRemaining)}Rs.`));
                }
            } else {
                console.log(chalk.red(`Insufficient balance. Current balance is ${chalk.yellow(this.balance)}Rs.`));
            }
        } else {
            console.log(chalk.red(`Invalid amount. Please enter a positive number.`));
        }
    }

    depositBalance(amount: number) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.green(`${chalk.yellow(amount)}Rs deposited successfully to ${chalk.bold(this.name)}'s account.`));
        } else {
            console.log(chalk.red(`Invalid amount. Please enter a positive number.`));
        }
    }

    showStatus() {
        console.log(chalk.bold(`Student ID: ${this.id}`));
        console.log(chalk.bold(`Name: ${this.name}`));
        console.log(chalk.bold(`Courses: ${this.courses.join(", ")}`));
        console.log(`Balance: ${chalk.yellow(this.balance)}Rs`);
        console.log(`Total Fees Paid: ${chalk.yellow(this.totalFeesPaid)}Rs`);
        console.log(`Total Fees Remaining: ${chalk.yellow(this.totalFeesRemaining)}Rs`);
    }
}

class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    addStudent(name: string) {
        let student = new Student(name);
        this.students.push(student);

        console.log(chalk.green(`\nStudent: ${chalk.bold(name)} added successfully\nStudent ID: ${chalk.bold(student.id)}\n`));
    }

    enrollStudent(studentID: number, course: string, fee: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.enrollCourse(course, fee);
        } else {
            console.log(chalk.red("Student not found. Please enter a correct Student ID"));
        }
    }

    viewStudentBalance(studentID: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.viewBalance();
        } else {
            console.log(chalk.red("Student not found. Please enter a correct Student ID"));
        }
    }

    payStudentFees(studentID: number, amount: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.payFees(amount);
        } else {
            console.log(chalk.red("Student not found. Please enter a correct Student ID"));
        }
    }

    depositStudentBalance(studentID: number, amount: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.depositBalance(amount);
        } else {
            console.log(chalk.red("Student not found. Please enter a correct Student ID"));
        }
    }

    showStudentStatus(studentID: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.showStatus();
        } else {
            console.log(chalk.red("Student not found. Please enter a correct Student ID"));
        }
    }

    findStudent(studentID: number) {
        return this.students.find(student => student.id === studentID);
    }
}

async function main() {
    console.log(chalk.yellow.bold("Welcome to our STUDENT MANAGEMENT SYSTEM"));
    console.log(chalk.yellow.bold("-".repeat(50)));

    let studentManager = new StudentManager();

    while (true) {
        let choice = await inquirer.prompt({
            type: "list",
            name: "options",
            message: chalk.bold("Please select an option"),
            choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Deposit Balance", "View Student Status", "Exit"]
        });

        switch (choice.options) {
            case "Add Student":
                let ask = await inquirer.prompt({
                    name: "name",
                    message: chalk.bold("Enter the Student Name"),
                    type: "input"
                });
                studentManager.addStudent(ask.name);
                break;

            case "Enroll Student":
                let ask2 = await inquirer.prompt([
                    {
                        name: "studentID",
                        message: chalk.bold("Enter the Student ID"),
                        type: "number"
                    },
                    {
                        type: "list",
                        name: "course",
                        message: chalk.bold("Please select a course"),
                        choices: [
                            {name: "English Language - 3000/=", value: {course: "English Language", fee: 3000}},
                            {name: "Digital Accounting - 3500/=", value: {course: "Digital Accounting", fee: 3500}},
                            {name: "Graphic Designing - 3500/=", value: {course: "Graphic Designing", fee: 3500}},
                            {name: "Web Development - 5000/=", value: {course: "Web Development", fee: 5000}},
                            {name: "Video Editing - 4000/=", value: {course: "Video Editing", fee: 4000}},
                            {name: "CIT - 3000/=", value: {course: "CIT", fee: 3000}}
                        ]
                    }
                ]);
                studentManager.enrollStudent(ask2.studentID, ask2.course.course, ask2.course.fee);
                break;

            case "View Student Balance":
                let ask3 = await inquirer.prompt({
                    name: "studentID",
                    message: chalk.bold("Enter the Student ID"),
                    type: "number"
                });
                studentManager.viewStudentBalance(ask3.studentID);
                break;

            case "Pay Fees":
                let ask4 = await inquirer.prompt([
                    {
                        name: "studentID",
                        message: chalk.bold("Enter the Student ID"),
                        type: "number"
                    },
                    {
                        name: "amount",
                        message: chalk.bold("Enter the amount"),
                        type: "number"
                    }
                ]);
                studentManager.payStudentFees(ask4.studentID, ask4.amount);
                break;

            case "Deposit Balance":
                let ask5 = await inquirer.prompt([
                    {
                        name: "studentID",
                        message: chalk.bold("Enter the Student ID"),
                        type: "number"
                    },
                    {
                        name: "amount",
                        message: chalk.bold("Enter the amount"),
                        type: "number"
                    }
                ]);
                studentManager.depositStudentBalance(ask5.studentID, ask5.amount);
                break;

            case "View Student Status":
                let ask6 = await inquirer.prompt({
                    name: "studentID",
                    message: chalk.bold("Enter the Student ID"),
                    type: "number"
                });
                studentManager.showStudentStatus(ask6.studentID);
                break;

            case "Exit":
                console.log(chalk.green.bold("Good Bye!"));
                process.exit();
        }
    }
}

main();

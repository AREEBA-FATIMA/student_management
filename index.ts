#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;
    
    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enrollCourse(course: string) {
        this.courses.push(course);
    }

    viewBalance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }

    payFees(amount: number) {
        if (amount > this.balance) {
            console.log(`Insufficient balance. Current balance is ${this.balance}Rs.`);
        } else {
            this.balance -= amount;
            console.log(`${amount}Rs fees paid successfully for ${this.name}`);
        }
    }

    depositBalance(amount: number) {
        this.balance += amount;
        console.log(`${amount}Rs deposited successfully to ${this.name}'s account.`);
    }

    showStatus() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(", ")}`);
        console.log(`Balance: ${this.balance}`);
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

        console.log(`
        Student: ${name} added successfully
        Student ID: ${student.id}
        `);
    }

    enrollStudent(studentID: number, course: string) {
        let student = this.findStudent(studentID);

        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} has been enrolled in ${course} successfully!`);
        } else {
            console.log("Student not found. Please enter a correct Student ID");
        }
    }

    viewStudentBalance(studentID: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.viewBalance();
        } else {
            console.log("Student not found. Please enter a correct Student ID");
        }
    }

    payStudentFees(studentID: number, amount: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.payFees(amount);
        } else {
            console.log("Student not found. Please enter a correct Student ID");
        }
    }

    depositStudentBalance(studentID: number, amount: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.depositBalance(amount);
        } else {
            console.log("Student not found. Please enter a correct Student ID");
        }
    }

    showStudentStatus(studentID: number) {
        let student = this.findStudent(studentID);

        if (student) {
            student.showStatus();
        } else {
            console.log("Student not found. Please enter a correct Student ID");
        }
    }

    findStudent(studentID: number) {
        return this.students.find(student => student.id === studentID);
    }
}

async function main() {
    console.log(chalk.bold.yellowBright("Welcome to our STUDENT MANAGEMENT SYSTEM"));
    console.log("-".repeat(50));

    let studentManager = new StudentManager();

    while (true) {
        let choice = await inquirer.prompt({
            type: "list",
            name: "options",
            message: "Please select an option",
            choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Deposit Balance", "View Student Status", "Exit"]
        });

        switch (choice.options) {
            case "Add Student":
                let ask = await inquirer.prompt({
                    name: "name",
                    message: "Enter the Student Name",
                    type: "input"
                });
                studentManager.addStudent(ask.name);
                break;

            case "Enroll Student":
                let ask2 = await inquirer.prompt([
                    {
                        name: "studentID",
                        message: "Enter the Student ID",
                        type: "number"
                    },
                    {
                        type: "list",
                        name: "course",
                        message: "Please select a course",
                        choices: ["English Language - 3000/=", "Digital Accounting - 3500/=", "Graphic Designing - 3500/=", "Web Development - 5000/=", "Video Editing - 4000/=", "CIT - 3000/="]
                    }
                ]);
                studentManager.enrollStudent(ask2.studentID, ask2.course);
                break;

            case "View Student Balance":
                let ask3 = await inquirer.prompt({
                    name: "studentID",
                    message: "Enter the Student ID",
                    type: "number"
                });
                studentManager.viewStudentBalance(ask3.studentID);
                break;

            case "Pay Fees":
                let ask4 = await inquirer.prompt([
                    {
                        name: "studentID",
                        message: "Enter the Student ID",
                        type: "number"
                    },
                    {
                        name: "amount",
                        message: "Enter the amount",
                        type: "number"
                    }
                ]);
                studentManager.payStudentFees(ask4.studentID, ask4.amount);
                break;

            case "Deposit Balance":
                let ask5 = await inquirer.prompt([
                    {
                        name: "studentID",
                        message: "Enter the Student ID",
                        type: "number"
                    },
                    {
                        name: "amount",
                        message: "Enter the amount",
                        type: "number"
                    }
                ]);
                studentManager.depositStudentBalance(ask5.studentID, ask5.amount);
                break;

            case "View Student Status":
                let ask6 = await inquirer.prompt({
                    name: "studentID",
                    message: "Enter the Student ID",
                    type: "number"
                });
                studentManager.showStudentStatus(ask6.studentID);
                break;

            case "Exit":
                console.log("Good Bye!");
                process.exit();
        }
    }
}

main();

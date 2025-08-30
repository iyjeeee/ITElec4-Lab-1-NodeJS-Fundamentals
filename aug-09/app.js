const { hasPassingGrade } = require('./utils');

// Main app.js Logic
const studentName = "Recto, John Andrei D.";
let grades = [59, 69, 79, 89, 99];

const studentDetails = {
    major: "BS Information Technology",
    year: "4"
};

const calculateAverage = (grades) => {
    const sum = grades.reduce((total, grade) => total + grade, 0);
    return sum / grades.length;
};

// Output Display
console.log(`Student Name: ${studentName}`);
console.log(`Major: ${studentDetails.major}`);
console.log(`Year: ${studentDetails.year}`);
console.log(`Student Grades: ${grades}`);
console.log(`Average Grade: ${calculateAverage(grades).toFixed(2)}`);

if (grades.every(hasPassingGrade)) {
    console.log("All grades are passing.");
}

const averageGrade = calculateAverage(grades);
if (hasPassingGrade(averageGrade)) {
    console.log("Congratulations! You have a passing average.");
} else {
    console.log("You need to improve your average grade.");
}
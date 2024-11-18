// backend/routers/courses.js
const express = require("express");
const router = express.Router();

// Placeholder data for courses, this will later be replaced with MongoDB operations
let courses = [
    { id: 1, title: "Web Development Fundamentals", description: "Learn the basics of web development." },
    { id: 2, title: "Advanced Web Development", description: "Master advanced topics in web development." },
];

// GET all courses
router.get("/", (req, res) => {
    res.json(courses);
});

// POST a new course (for admin purposes)
router.post("/", (req, res) => {
    const { title, description } = req.body;
    const newCourse = { id: courses.length + 1, title, description };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// GET a specific course by ID
router.get("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course not found");
    res.json(course);
});

module.exports = router;

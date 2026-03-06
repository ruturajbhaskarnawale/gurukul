"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTestResult = exports.uploadMaterial = exports.deleteCourse = exports.createCourse = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// --- Courses ---
const createCourse = async (req, res) => {
    try {
        const { title, slug, category, description, duration, feeStructure } = req.body;
        // Validate slug uniqueness
        const existing = await prisma_1.default.course.findUnique({ where: { slug } });
        if (existing) {
            return res.status(400).json({ error: 'Slug already exists' });
        }
        const course = await prisma_1.default.course.create({
            data: { title, slug, category, description, duration, feeStructure }
        });
        res.status(201).json(course);
    }
    catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createCourse = createCourse;
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.course.delete({ where: { id } });
        res.json({ message: 'Course deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteCourse = deleteCourse;
// --- Materials ---
const uploadMaterial = async (req, res) => {
    try {
        const { title, fileUrl, courseId } = req.body;
        // Ensure course exists
        const course = await prisma_1.default.course.findUnique({ where: { id: courseId } });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        const material = await prisma_1.default.studyMaterial.create({
            data: { title, fileUrl, courseId }
        });
        res.status(201).json(material);
    }
    catch (error) {
        console.error('Error uploading material:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.uploadMaterial = uploadMaterial;
// --- Test Results ---
const addTestResult = async (req, res) => {
    try {
        const { userId, testName, marksObtained, totalMarks, testDate } = req.body;
        const result = await prisma_1.default.testResult.create({
            data: { userId, testName, marksObtained, totalMarks, testDate: new Date(testDate) }
        });
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error adding test result:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.addTestResult = addTestResult;

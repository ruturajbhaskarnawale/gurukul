"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitInquiry = exports.getCourseBySlug = exports.getPublicCourses = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getPublicCourses = async (req, res) => {
    try {
        const courses = await prisma_1.default.course.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                description: true,
                duration: true,
                feeStructure: true,
            }
        });
        res.json(courses);
    }
    catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getPublicCourses = getPublicCourses;
const getCourseBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const course = await prisma_1.default.course.findUnique({
            where: { slug }
        });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    }
    catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCourseBySlug = getCourseBySlug;
const submitInquiry = async (req, res) => {
    try {
        // In a real scenario, you'd save this to `ContactMessage` table 
        // (which needs to be added to the schema, or handled by a 3rd party like Resend)
        const { name, email, mobile, message } = req.body;
        console.log('New Inquiry received:', { name, email, mobile, message });
        res.status(201).json({ message: 'Inquiry submitted successfully' });
    }
    catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.submitInquiry = submitInquiry;

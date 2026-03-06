"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentMaterials = exports.getStudentTestResults = exports.getStudentProfile = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getStudentProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                mobileNumber: true,
                studentProfile: {
                    include: {
                        enrollments: {
                            include: {
                                course: true
                            }
                        }
                    }
                }
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getStudentProfile = getStudentProfile;
const getStudentTestResults = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const results = await prisma_1.default.testResult.findMany({
            where: { userId },
            orderBy: { testDate: 'desc' }
        });
        res.json(results);
    }
    catch (error) {
        console.error('Error fetching test results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getStudentTestResults = getStudentTestResults;
const getStudentMaterials = async (req, res) => {
    try {
        const userId = req.user?.userId;
        // First find which courses the student is enrolled in
        const student = await prisma_1.default.studentProfile.findUnique({
            where: { userId },
            include: { enrollments: true }
        });
        if (!student) {
            return res.status(404).json({ error: 'Student profile not found' });
        }
        const courseIds = student.enrollments.map(e => e.courseId);
        // Get materials only for enrolled courses
        const materials = await prisma_1.default.studyMaterial.findMany({
            where: {
                courseId: { in: courseIds }
            },
            include: {
                course: { select: { title: true } }
            },
            orderBy: { uploadedAt: 'desc' }
        });
        res.json(materials);
    }
    catch (error) {
        console.error('Error fetching study materials:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getStudentMaterials = getStudentMaterials;

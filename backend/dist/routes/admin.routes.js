"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protect ALL admin routes
router.use(auth_middleware_1.verifyToken, auth_middleware_1.requireAdmin);
router.post('/courses', admin_controller_1.createCourse);
router.delete('/courses/:id', admin_controller_1.deleteCourse);
router.post('/materials', admin_controller_1.uploadMaterial);
router.post('/tests', admin_controller_1.addTestResult);
exports.default = router;

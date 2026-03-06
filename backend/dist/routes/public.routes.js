"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_controller_1 = require("../controllers/public.controller");
const router = (0, express_1.Router)();
router.get('/courses', public_controller_1.getPublicCourses);
router.get('/courses/:slug', public_controller_1.getCourseBySlug);
router.post('/inquiries', public_controller_1.submitInquiry);
exports.default = router;

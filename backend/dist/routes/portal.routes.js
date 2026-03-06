"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portal_controller_1 = require("../controllers/portal.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protect all portal routes
router.use(auth_middleware_1.verifyToken);
router.get('/me', portal_controller_1.getStudentProfile);
router.get('/tests', portal_controller_1.getStudentTestResults);
router.get('/materials', portal_controller_1.getStudentMaterials);
exports.default = router;

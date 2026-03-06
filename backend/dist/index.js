"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("./prisma"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const portal_routes_1 = __importDefault(require("./routes/portal.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/public', public_routes_1.default);
app.use('/api/v1/portal', portal_routes_1.default);
app.use('/api/v1/admin', admin_routes_1.default);
// Basic health check route
app.get('/health', async (req, res) => {
    try {
        await prisma_1.default.$queryRaw `SELECT 1`;
        res.status(200).json({ status: 'OK', database: 'Connected' });
    }
    catch (error) {
        res.status(500).json({ status: 'ERROR', database: 'Disconnected' });
    }
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

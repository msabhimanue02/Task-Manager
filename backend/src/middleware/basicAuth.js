import dotenv from 'dotenv';
dotenv.config();
const expectedUser = process.env.BASIC_AUTH_USER || 'admin';
const expectedPass = process.env.BASIC_AUTH_PASS || 'password123';
export function basicAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Basic ')) {
        return res.status(401).json({ error: 'Unauthorized access. Please provide valid credentials.' });
    }
    const base64 = auth.split(' ')[1];
    if (!base64) {
        return res.status(401).json({ error: 'Unauthorized access. Please provide valid credentials.' });
    }
    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const [user, pass] = decoded.split(':');
    if (user !== expectedUser || pass !== expectedPass) {
        return res.status(401).json({ error: 'Unauthorized access. Please provide valid credentials.' });
    }
    next();
}
//# sourceMappingURL=basicAuth.js.map
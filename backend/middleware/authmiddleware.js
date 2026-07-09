const authMiddleware = (req, res, next) => {

    req.tenantId = req.header("X-Tenant-Id");
    req.userId = req.header("X-User-Id");

    if (!req.tenantId || !req.userId) {
        return res.status(400).json({
            message: "X-Tenant-Id and X-User-Id headers are required"
        });
    }

    next();
};

module.exports = authMiddleware;


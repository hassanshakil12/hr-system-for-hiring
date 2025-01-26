export const organizationAuthorization = async (req, res, next) => {
    if(req.user.entityType !== "organization") {
        return res.status(403).json({ message: "Unauthorized: Access denied", success: false });
    }
    next();
}
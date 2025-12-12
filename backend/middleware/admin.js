module.exports = function (req, res, next) {
  // if user has admin role then only able to proceed next
  console.log(req.user.role);
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin only route." });
  }
  next();
};

module.exports = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied — Admins only!" });
    }
    next();
};
 
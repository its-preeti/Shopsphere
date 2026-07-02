 id="4g5pbm"
const admin =
(req, res, next) => {

  if (
    req.user &&
    req.user.isAdmin
  ) {

    next();

  } else {

    res.status(401).json({

      message:
      "Admin Access Denied",

    });

  }

};

module.exports = {
  admin,
};


const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req?.headers?.authorization;

  if (token) {
    const accessToken = token.split(" ")[1];

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      function (err, decoded) {
        if (err) {
          console.log(err, "error jwt.verify");

          if (err?.name === "TokenExpiredError") {
            return res.status(403).json({
              success: true,
              message: "token expired",
              data: null,
            });
          }

          return err;
        }

        next();
      }
    );
  } else {
    return res.status(401).json({
      success: true,
      message: "No auth",
      data: null,
    });
  }
};

module.exports = { verifyAuth };

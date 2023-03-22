const jwt = require("jsonwebtoken");
const responseHandler = require("../utils/responseHandler");

const config = process.env;
const generateToken = (users, res) => {
  const dataEnter = {
    id: users.id,
    full_name: users.full_name,
    email: users.email,
    password: users.password,
  };

  const tokenData = jwt.sign(
    dataEnter,
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: 60 * 10 },
    (err, token) => {
      if (err) {
        console.log(err);
        responseHandler.errorHandle(res, err);
      } else {
        dataEnter["token"] = token;
        jwt.sign(
          dataEnter,
          config.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" },
          (err, refresh_token) => {
            if (err) {
              console.log(err);
              responseHandler.errorHandle(res, err);
            } else {
              dataEnter["refresh_token"] = refresh_token;

              res.status(200).json({
                error: false,
                token: token,
                refresh_token: refresh_token,
              });
            }
          }
        );
      }
    }
  );
};

const verifyToken = (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  const config = process.env;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "A token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    req.body["user"] = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      error: true,
      message: "Invalid Token",
    });
  }
  return next();
};

const refreshToken = (req, res) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  const config = process.env;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "A token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    const dataEnter = {
      id: decoded.id,
      full_name: decoded.full_name,
      email: decoded.email,
      password: decoded.password,
    };
    generateToken(dataEnter, res);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      error: true,
      message: "Invalid Token",
    });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  refreshToken,
};

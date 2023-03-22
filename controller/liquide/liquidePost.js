const { readPool } = require("../../db/db");
const responseHandler = require("../../utils/responseHandler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../middleware/authentication");
const salt = bcrypt.genSaltSync(10);
const moment = require("moment");

const deleteTrades = (req, res, next) => {
  responseHandler.clientError(res);
};

const login_sign_up = (req, res) => {
  const { full_name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, salt);

  readPool.query(
    "SELECT id FROM login_access where email=?",
    [email],
    (error, search) => {
      if (error) {
        responseHandler.errorHandle(res, error);
      } else {
        if (search.length > 0) {
          responseHandler.errorHandle(res, "User already exists!");
        } else {
          readPool.query(
            "INSERT INTO login_access SET full_name=?,email=?,password=?",
            [full_name, email, hash],
            (error, insert) => {
              if (error) {
                responseHandler.errorHandle(res, error);
              } else {
                responseHandler.createdResponse(res);
              }
            }
          );
        }
      }
    }
  );
};

const login_check = (req, res) => {
  const { email, password } = req.body;

  readPool.query(
    "SELECT * FROM login_access where email=?",
    [email],
    (error, tokenData) => {
      if (error) {
        responseHandler.errorHandle(res, error);
      } else {
        if (tokenData.length > 0) {
          if (bcrypt.compareSync(password, tokenData[0]?.password)) {
            generateToken(tokenData[0], res);
          } else {
            responseHandler.errorHandle(
              res,
              "Please check the inserted detials!"
            );
          }
        } else {
          responseHandler.errorHandle(res, "User doesn't exists!");
        }
      }
    }
  );
};

const createTrade = (req, res, next) => {
  const { type, symbol, shares, price } = req.body;
  const user_id = req.body.user.id;
  const date = new Date();
  const timeStamp = moment(date).format("x");

  if (!type || !user_id || !symbol || !shares || !price) {
    return responseHandler.errorHandle(res, "Invalid trade object");
  }
  if (type !== "buy" && type !== "sell") {
    return responseHandler.errorHandle(res, "Invalid trade type");
  }
  if (shares < 1 || shares > 100) {
    return responseHandler.errorHandle(res, "Invalid number of shares");
  }
  const preIsert = { type, symbol, shares, price, user_id, timeStamp };

  readPool.query(
    "INSERT INTO stock_trade SET type=?, symbol=?, shares=?, price=?,user_id=?,timestamp=?",
    [type, symbol, shares, price, user_id, timeStamp],
    (error, insert) => {
      if (error) {
        responseHandler.errorHandle(res, error);
      } else {
        preIsert.id = insert.insertId;
        responseHandler.createdDataResponse(res, "created_obj", preIsert);
      }
    }
  );
};

module.exports = {
  deleteTrades,
  login_sign_up,
  login_check,
  createTrade,
};

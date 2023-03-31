const { readPool } = require("../../db/db");
const responseHandler = require("../../utils/responseHandler");

const getTrades = (req, res, next) => {
  const queryData = req.query;
  let userData = "";
  if (queryData?.type) {
    userData = `where type='${queryData.type}' `;
  } else if (queryData?.user_id) {
    userData = `where  user_id=${queryData.user_id}`;
  } else {
    userData = `where type='${queryData.type}' and user_id=${queryData.user_id}`;
  }

  if (
    queryData?.type == "buy" ||
    queryData?.type == "sell" ||
    queryData.user_id
  ) {
    readPool.query(
      `SELECT id,
    type,
    user_id,
    symbol,
    shares,
    price,
    timestamp from stock_trade ${userData}`,
      (error, trades) => {
        if (error) {
          responseHandler.errorHandle(res, error);
        } else {
          responseHandler.successDataResponse(res, "trades_list", trades);
        }
      }
    );
  } else {
    responseHandler.errorHandle(res, "trades_list", trades);
  }
};

const getSigleTrades = (req, res, next) => {
  const { id } = req.params;

  readPool.query(
    `SELECT id,
    type,
    user_id,
    symbol,
    shares,
    price,
    timestamp from stock_trade where id=?`,
    [id],
    (error, trades) => {
      if (error) {
        responseHandler.errorHandle(res, error);
      } else {
        if (trades.length > 0) {
          responseHandler.successDataResponse(res, "trade_data", trades[0]);
        } else {
          responseHandler.errorHandle(res, "Invalid number");
        }
      }
    }
  );
};

module.exports = {
  getTrades,
  getSigleTrades,
};

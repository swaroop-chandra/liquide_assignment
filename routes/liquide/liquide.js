const express = require("express");

const liquideUrl = require("../../config/url");
const {
  getTrades,
  getSigleTrades,
} = require("../../controller/liquide/liquideGet");
const {
  deleteTrades,
  login_sign_up,
  login_check,
  createTrade,
} = require("../../controller/liquide/liquidePost");
const {
  verifyToken,
  refreshToken,
} = require("../../middleware/authentication");

const router = express.Router();

//get
router.get(liquideUrl.REFRESH_TOKEN, refreshToken);
router.get(liquideUrl.LIQUIDE_TRADE, verifyToken, getTrades);
router.get(liquideUrl.LIQUIDE_TRADE_ID, verifyToken, getSigleTrades);

//post
router.post(liquideUrl.LIQUIDE_SIGNUP, login_sign_up);
router.post(liquideUrl.LIQUIDE_LOGIN, login_check);
router.post(liquideUrl.LIQUIDE_TRADE, verifyToken, createTrade);

//delete put patch
router.delete(liquideUrl.LIQUIDE_TRADE_ID, verifyToken, deleteTrades);
router.put(liquideUrl.LIQUIDE_TRADE_ID, verifyToken, deleteTrades);
router.patch(liquideUrl.LIQUIDE_TRADE_ID, verifyToken, deleteTrades);

module.exports = router;

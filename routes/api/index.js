var express = require("express");
var router = express.Router();

var userRouter = require("./users");
var receptionRouter = require("./reception");

router.use("/users", userRouter);
router.use("/receptions", receptionRouter);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ success: true, message: "Welcome to Node APIs" });
});

module.exports = router;

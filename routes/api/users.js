var express = require("express");
var router = express.Router();
var User = require("../../models/User");
var auth = require("../../utils/verifyToken");

// import bcrypt for password
var bcrypt = require("bcrypt");

// import jwt for tokens
var jwt = require("jsonwebtoken");

// routes for user registration
router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.json(err);
    jwt.sign({ userId: user.id }, process.env.SECRET, (err, token) => {
      if (err) return res.json({ succees: false, err });
      return res.status(201).json({
        success: true,
        message: "Your are succesfully registered.",
        token: token
      });
    });
  });
});

// routes for finding currentLogin Users
router.get("/me", auth.verifyToken, (req, res) => {
  console.log(req.user);
  User.findById(req.user.userId, "-password", (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(201).json({ success: true, user: user });
  });
});

router.post("/login", (req, res) => {
  const data = req.body;
  User.findOne({ email: data.email }, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, error: "server error" });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter a valid email" });
    }
    if (user) {
      var result = bcrypt.compareSync(data.password, user.password);
      if (result) {
        var token = jwt.sign({ userId: user.id }, process.env.SECRET);
        return res.status(200).json({ success: true, token: token, user });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Password" });
      }
    }
  });
});

router.use(auth.verifyToken);

// user edit and update
router.put("/update/:id", function(req, res, next) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "server error", err });
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "user updated", user });
      }
    }
  );
});

// delete users
router.delete("/:id", function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "server error", err });
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "user updated", user });
    }
  });
});

module.exports = router;

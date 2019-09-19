var express = require("express");
var router = express.Router();
var Reception = require("../../models/Reception");
var auth = require("../../utils/verifyToken");

// List all data
router.get("/", auth.verifyToken, (req, res) => {
  // fetch  all receptions from database and send it in response
  Reception.find({}, (err, receptions) => {
    if (err) res.status(500).json({ success: false, error: "server error" });
    res.status(200).json({ success: true, receptions });
  });
});

// create reception
router.post("/", auth.verifyToken, (req, res) => {
  Reception.create(req.body, (err, reception) => {
    if (err) return res.json(err);
    res.status(201).json({ success: true, reception: reception });
  });
});

// Only For  Admin

// Update a reception
router.put("/:id", auth.verifyToken, (req, res) => {
  // capture updated data using req.body
  // update reception
  var id = req.params.id;
  Reception.findByIdAndUpdate(id, req.body, { new: true }, (err, reception) => {
    if (err) res.status(500).json({ success: false, error: "server error" });
    res.status(201).json({ success: true, reception });
  });
});

// fetch single Reception
router.get("/:id", auth.verifyToken, (req, res) => {
  var id = req.params.id;
  console.log(id, "backend");
  Reception.findById(id, (err, reception) => {
    if (err) return res.status(401).json(err);
    res.status(201).json({ success: true, reception });
  });
});

module.exports = router;

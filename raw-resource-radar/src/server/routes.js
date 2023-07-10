const express = require("express");
const data = require("./materialModel"); // new
const router = express.Router();

// Get all posts
router.get("/data", async (req, res) => {
  const fetchedData = await data.find();
  res.send(fetchedData);
});

router.post("/data", async (req, res) => {
  console.log("request 1  ", req.body);
  const SaveDate = new data({
    name: req.body.name,
    color: req.body.color,
    vol: req.body.vol,
    cost: req.body.cost,
  });
  await SaveDate.save();
  //   console.log(res);
  res.send(SaveDate);
});

module.exports = router;

const express = require("express");
const data = require("./materialModel");
const router = express.Router();

// Get all raw material list
router.get("/data", async (req, res) => {
  const fetchedData = await data.find();
  res.send(fetchedData);
});

//Post request when new entry is created from the Form
router.post("/data", async (req, res) => {
  const SaveData = new data({
    name: req.body.name,
    color: req.body.color,
    vol: req.body.vol,
    cost: req.body.cost,
  });
  await SaveData.save();
  res.send(SaveData);
});

//Put request when a data/entry is updated
router.put("/data/:id", async (req, res) => {
  const newData = await data.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      color: req.body.color,
      vol: req.body.vol,
      cost: req.body.cost,
    }
  );
  res.send(newData);
});

//Delete request when an entry needs to be removed
router.delete("/data/:id", async (req, res) => {
  const deleteData = await data.findByIdAndDelete({ _id: req.params.id });
  if (!deleteData) {
    res.status(404).send;
  }
  res.send(deleteData);
});

module.exports = router;

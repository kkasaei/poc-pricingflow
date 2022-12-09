const express = require("express");
const router = express.Router();
const Widget = require("./models/widget");

router.get("/", (req, res) => {
  res.send("Server is up");
});

router.get("/widgets", async (req, res) => {
  const widgets = await Widget.find();
  res.json(widgets);
});

router.post("/widgets", async (req, res) => {
  const widget = await Widget.create(req.body);
  res.json(widget);
});

router.get("/widgets/:id", async (req, res) => {
  const widget = await Widget.findById(req.params.id);
  res.json(widget);
});

router.get("/widgets/apikey/:id", async (req, res) => {
  const widget = await Widget.findOne().where({
    'apiKey': req.params.id,
  });
   res.json(widget);
})

router.put("/widgets/:id", async (req, res) => {
  const widgets = await Widget.findByIdAndUpdate(req.params.id, req.body);
  res.json(widgets);
});

router.delete("/widgets/:id", async (req, res) => {
  await Widget.findOneAndDelete(req.params.id);
  res.json({ status: "deleted" });
});

module.exports = router;

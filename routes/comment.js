const express = require("express");
const router = express.Router();
const movieDB = require("../db/MovieDB");

router.get("/all", async (req, res) => {
  res.send(await movieDB.GetAllComment());
});

router.post("/post", async (req, res) => {
  res.send(await movieDB.PostComment(req.body));
});

module.exports = router;

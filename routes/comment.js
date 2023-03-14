const express = require("express");
const router = express.Router();
const movieDB = require("../db/MovieDB");

router.post("/post", async (req, res) => {
  let result = await movieDB.PostComment(req.body);
  res.send(result);
});

router.get("/all", async (req, res) => {
  let comment = await movieDB.GetAllComment();
  res.send(comment);
});

router.get("/random", async (req, res) => {
  let comment = await movieDB.GetRandomComment();
  res.send(comment);
});

module.exports = router;

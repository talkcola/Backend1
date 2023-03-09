const express = require("express");
const router = express.Router();
const movieDB = require("../db/MovieDB");

router.post("/comment", async (req, res) => {
  res.send(await movieDB.PostComment(req.body));
});

router.post("/post", async (req, res) => {
  res.send(await movieDB.PostComment(req.body));
});

module.exports = router;

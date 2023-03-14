const express = require("express");
const router = express.Router();
const movieDB = require("../db/MovieDB");

router.get("/all", async (req, res) => {
  let json = await movieDB.GetAllMovie();
  res.send(json);
});

router.get("/random", async (req, res) => {
  let poster = await movieDB.GetRandomMovie();
  res.send(poster);
});

module.exports = router;

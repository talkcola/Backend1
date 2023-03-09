const express = require("express");
const router = express.Router();
const movieDB = require("../db/MovieDB");

router.get("/all", async (req, res) => {
  let json = await movieDB.GetAllMovie();
  res.send(json);
});

module.exports = router;

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here Beautiful");
});

module.exports = router;

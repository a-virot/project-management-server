const router = require("express").Router();

router.get("/test", (req, res, next) => {
  res.json("Ma route test");
});

module.exports = router;

const express = require("express");
const SignLanguage = require("../models/SignLanguage");
const router = express.Router();

router.get("/consonant", async (req, res, next) => {
  try {
    const signLanguages = await SignLanguage.find({ type: "consonant" });
    // return res.status(200).json({
    // title: products.title,
    // description: req.signlanguage.description,
    // type: req.signlanguage.type,
    // images: req.signlanguage.images,
    // video: req.signlanguage.video,
    // });
    return res.status(200).json({ signLanguages });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const SignLanguages = new SignLanguage(req.body);

    await SignLanguages.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

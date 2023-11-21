const express = require("express");
const SignLanguage = require("../models/SignLanguage");
const router = express.Router();

router.get("/consonant/index", async (req, res, next) => {
  try {
    const index = await SignLanguage.find({ type: "consonant" }).count();
    return res.status(200).json({ index });
  } catch (error) {
    next(error);
  }
});
router.get("/consonant", async (req, res, next) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 5;

    const skip = (page - 1) * limit;
    const signLanguages = await SignLanguage.find({ type: "consonant" })
      .sort([["name", "asc"]])
      .skip(skip)
      .limit(limit);

    return res.status(200).json({ signLanguages });
  } catch (error) {
    next(error);
  }
});
router.get("/word/index", async (req, res, next) => {
  try {
    const index = await SignLanguage.find({ type: "word" }).count();
    return res.status(200).json({ index });
  } catch (error) {
    next(error);
  }
});
router.get("/word", async (req, res, next) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 5;

    const skip = (page - 1) * limit;
    const signLanguages = await SignLanguage.find({
      type: "word",
      name: { $ne: "#NAME?" },
    })
      .sort([["name", "asc"]])
      .skip(skip)
      .limit(limit);

    return res.status(200).json({ signLanguages });
  } catch (error) {
    next(error);
  }
});
router.get("/search", async (req, res, next) => {
  try {
    // const page = req.query.page ? Number(req.query.page) : 1;
    // const limit = req.query.limit ? Number(req.query.limit) : 10;

    // const skip = (page - 1) * limit;
    const search = req.query.search ? String(req.query.search) : "";
    const signLanguages = await SignLanguage.find({ name: search });

    return res.status(200).json({ signLanguages });
  } catch (error) {
    next(error);
  }
});
// router.post("/", async (req, res, next) => {
//   try {
//     const SignLanguages = new SignLanguage(req.body);

//     await SignLanguages.save();
//     return res.sendStatus(200);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;

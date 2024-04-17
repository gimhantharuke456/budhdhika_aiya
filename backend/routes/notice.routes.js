const express = require("express");
const noticeController = require("../controllers/notice.controller");
const router = express.Router();

router.post("/notices", noticeController.createNotice);
router.get("/notices", noticeController.getAllNotices);
router.get("/notices/:id", noticeController.getNoticeById);
router.put("/notices/:id", noticeController.updateNotice);
router.delete("/notices/:id", noticeController.deleteNotice);

module.exports = router;

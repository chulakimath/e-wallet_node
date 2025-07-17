import express from "express";
import { sql } from "../config/db.js";
import { createTransactionById, deleteTransactionByRowId, getSummaryByUserId, getTransactionByUserId } from "../controller/transactionController.js";

const router = express.Router();
router.get("/:user_id",getTransactionByUserId);
router.delete("/:row_id", deleteTransactionByRowId);
router.post('/', createTransactionById);

router.get("/summary/:user_id", getSummaryByUserId);
export default router;
import express from "express";
import { createTransactionById, deleteTransactionByRowId, getSummaryByUserId, getTransactionByUserId } from "../controller/transactionController.js";

const router = express.Router();
router.get("/",getTransactionByUserId);
router.delete("/:row_id", deleteTransactionByRowId);
router.post('/', createTransactionById);
router.get("/summary/", getSummaryByUserId);
export default router;
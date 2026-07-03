import { Router } from "express";
import { createReceiptHandler, getAllReceiptsHandler, getReceiptByIdHandler, updateReceiptHandler, deleteReceiptHandler, } from "../controllers/receipt..controllers";


const router = Router();

router.get("/", getAllReceiptsHandler);
router.get("/:id", getReceiptByIdHandler);
router.post("/", createReceiptHandler);
router.put("/:id", updateReceiptHandler);
router.delete("/:id", deleteReceiptHandler);
export default router;
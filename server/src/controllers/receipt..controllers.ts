import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceipt,
  deleteReceipt,
} from "../services/receipt.service";

export const createReceiptHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const receipt = await createReceipt(req.body);

    res.status(201).json({
      success: true,
      message: "Receipt created successfully",
      data: receipt,
    });
  }
);

export const getAllReceiptsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const receipts = await getAllReceipts();

    res.status(200).json({
      success: true,
      count: receipts.length,
      data: receipts,
    });
  }
);

export const getReceiptByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const receipt = await getReceiptById(id);

    res.status(200).json({
      success: true,
      data: receipt,
    });
  }
);

export const updateReceiptHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const receipt = await updateReceipt(id, req.body);

    res.status(200).json({
      success: true,
      message: "Receipt updated successfully",
      data: receipt,
    });
  }
);

export const deleteReceiptHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteReceipt(id);

    res.status(200).json({
      success: true,
      message: "Receipt deleted successfully",
    });
  }
);
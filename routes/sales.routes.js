import express from "express";
import {addSale,getAllSales,removeSale} from "../controllers/itemControllers.js";

const saleRouter = express.Router();

saleRouter.post("/sales", addSale);
saleRouter.get("/sales", getAllSales);
saleRouter.delete("/sales/:saleId", removeSale);

export default saleRouter;

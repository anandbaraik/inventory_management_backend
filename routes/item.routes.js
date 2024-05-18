import express from "express";
import {AddItem,getItems,removeItem,updateItem} from "../controllers/itemControllers.js";

const itemRouter = express.Router();

itemRouter.get("/items", getItems);
itemRouter.post("/items", AddItem);
itemRouter.delete("/items/:itemId", removeItem);
itemRouter.post("/items/:itemId/update", updateItem);

export default itemRouter;

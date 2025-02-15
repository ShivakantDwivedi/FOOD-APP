import express from "express";
import authorize from "../middleware/authMiddle.js";
import { addProduct, getProduct } from "../controller/product.js";
import upload from "../middleware/imageUplode.js";

const router = express.Router();

router.post("/addProduct", authorize, upload.array("images", 5), addProduct);
router.get("/getProductHistory", authorize, getProduct);

export default router;

import { Router } from "express";
import {
  createLink,
  getAllLinks,
  getSingleLink,
  deleteLink,
} from "../controllers/link.controller.js";

const router = Router();

router.post("/", createLink);
router.get("/", getAllLinks);
router.get("/:code", getSingleLink);
router.delete("/:code", deleteLink);

export default router;

import { Router } from "express";
import {
  getExample,
  registerExample,
} from "../controllers/example.controller.js";

const router = Router();

router.route("/example").get(getExample);
router.route("/register").post(registerExample);

export default router;

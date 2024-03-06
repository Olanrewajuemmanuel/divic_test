import { Router } from "express";
import modelController from "../Controllers/modelController";

const router = Router();

router.get("/model-data", modelController);

export default router;

import { Router } from "express";
import { getRecs } from "../controllers/recommendations.controller";

const router: Router = Router();

router.post("/recs", getRecs);

export default router;

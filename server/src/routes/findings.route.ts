// src/routes/userRoutes.ts
import { Router } from "express";
import {
  getAllGroupedFindings,
  getAllRawFindings,
} from "../controllers/findings.controller";

const router: Router = Router();

router.get("/raw_findings_all", getAllRawFindings);
router.get("/grouped_findings_all", getAllGroupedFindings);

export default router;

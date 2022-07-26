import { Router } from "express";
import uploadController from "./../controllers/upload/upload";

const router: Router = Router();

router.post("/file", uploadController.uploadFile);
export default router;

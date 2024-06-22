import { Router } from "express";
import candidateController from "../controllers/candidate.controller";
import { CreateCandidateDTO } from "../dtos/candidate.dto";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";

const candidateRouter = Router()

candidateRouter.post("/create", [checkAdmin, validationMiddleware(CreateCandidateDTO)], candidateController.createCandidate)
candidateRouter.get("/all", [checkLoggedIn], candidateController.getCandidates)
candidateRouter.get("/:id", [checkLoggedIn], candidateController.getCandidateById)
candidateRouter.patch("/vote/:candidate", [checkLoggedIn], candidateController.voteCandidate)
candidateRouter.delete("/reset-password", [checkAdmin], candidateController.deleteCandidate)

export default candidateRouter
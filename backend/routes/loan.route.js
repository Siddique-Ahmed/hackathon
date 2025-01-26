import { Router } from "express";
import isAthenticated from "../middlewares/isAuthenticate.js";
import { getLoanRequest,loanRequest } from "../controllers/loan.controller.js";

const routes = Router();

routes.route("/request").post(isAthenticated, loanRequest);
routes.route("/getRequest").get(isAthenticated, getLoanRequest);

export default routes;

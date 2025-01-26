import { Router } from "express";
import isAthenticated from "../middlewares/isAuthenticate.js";
import { getAllRequest, updateStatus } from "../controllers/admin.contoller.js";

const routes = Router();

routes.route("/getallrequest").get(isAthenticated, getAllRequest);
routes.route("/update/:id").put(updateStatus);

export default routes;

import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller.js";

const routes = Router();

routes.route("/register").post(register);
routes.route("/login").post(login);
routes.route("/logout").post(logout);

export default routes;

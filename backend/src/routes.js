import { Router } from "express";
import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import StudentsController from "./app/controllers/StudentsController";

const routes = Router();

routes.post("/sessions", SessionController.store);

routes.post("/users", UserController.store);

routes.use(authMiddleware);

routes.post("/students", StudentsController.store);

export default routes;

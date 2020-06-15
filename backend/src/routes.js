import { Router } from "express";
import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import StudentsController from "./app/controllers/StudentsController";
import PlansController from "./app/controllers/PlansController";
import EnrollmentController from "./app/controllers/EnrollmentController";

const routes = Router();

routes.post("/sessions", SessionController.store);

routes.post("/users", UserController.store);

routes.use(authMiddleware);

routes.post("/students", StudentsController.store);

routes.post("/plans", PlansController.store);
routes.put("/plans/:plan_id", PlansController.update);
routes.delete("/plans/:plan_id", PlansController.delete);
routes.get("/plans", PlansController.index);
routes.get("/plans/:plan_id", PlansController.show);

routes.post("/enrollments", EnrollmentController.store);
routes.put("/enrollments/:enrollment_id", EnrollmentController.update);
routes.get("/enrollments", EnrollmentController.index);
routes.get("/enrollments/:enrollment_id", EnrollmentController.show);

export default routes;

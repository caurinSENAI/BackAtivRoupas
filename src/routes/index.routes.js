import { Router } from "express";
import clotheRoutes from "./clothe.routes.js";

const routes = Router();

routes.use("/clothes", clotheRoutes);

routes.get("/", (req, res) => {
    return res.status(200).send({ message: "Server ta Rodando" });
});

export default routes;
import express, { Request, Response, Express } from "express";
import bodyParser from "body-parser";
import { mongooseConnection } from "../database/mongo/connection";
import cors from "cors";
import { userRouteList } from "./routes/get-routes";
import { AppErrorService } from "./cross/error/app-error";
import { config } from "../config/config";
import { getPublicRouteList } from "./routes/get-public-route-list";
import { validateJWT } from "./middlewares/validation/validate-jwt";
import { errorHandler } from "./middlewares/error/error-handler";
/*
app.post("/api/swap", async (req: Request, res: Response) => {
  try {
    const quote = await swapOperationService.service(req);
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ success: false, message: "Error fetching quote" });
  }
});
export default app;*/
export class ExpressServer {
  public app!: Express;
  private port!: string;
  constructor() {
    this.app = express();
    this.port = config.PORT.toString();
    this.connectDB();
    this.middlewares();
    this.routes();
    this.errorHandlers();
  }

  async connectDB() {
    await mongooseConnection();
  }

  middlewares() {
    const allowedOrigins = [process.env.SERVER, process.env.LOCAL_APP_CLIENT];

    this.app.use((req, res, next) => {
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            next(
              AppErrorService.getErrorByMessage("Origen no permitido por CORS")
            );
          }
        },
        credentials: true,
      })(req, res, next);
    });

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static("public"));
  }

  routes() {
    setupRoutes(this.app);
  }

  errorHandlers() {
    this.app.use(errorHandler);
  }
}
export const setupRoutes = (app: Express) => {
  // todo: add validatios to routes
  //app.use(publicRouteList.path, publicRouteList.route);
  getPublicRouteList().forEach((serviceRoute) => {
    app.use("/api/v1", serviceRoute);
  });
  app.all("*", validateJWT);
  // app.all("*", hasRole(roleList));
  // User routes
  //app.use("/api/v1", hasRole([RoleName.USER, RoleName.ADMIN]));
  userRouteList().forEach((serviceRoute) => {
    app.use("/api/v1", serviceRoute);
  });
  // Admin routes
};

import express from "express";

/**
 * Represents a Router
 */
class AppRouter {
  private static instance: express.Router;

  /**
    * @return {express.Router}
    */
  static get instanse(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }
}

export {AppRouter};

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import {NextFunction, RequestHandler, Request, Response} from "express";
import {AppRouter} from "../../AppRouter";
import {MetadataKeys} from "./MetadataKeys";
import {Method} from "./Methods";
import Joi from "@hapi/joi";

const validator =
  (schema: Joi.ObjectSchema<any>,
      type: MetadataKeys.body | MetadataKeys.query| MetadataKeys.params ): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
      if (schema) {
        const result = schema.validate(req[type]);
        if (result.error) {
          return res
              .status(400)
              .json({message: `${type} Error` + result.error.message});
        }
      }
      return next();
    };

const controller = (routePrefix: string) => (target: Function):void => {
  for (const key in target.prototype) {
    if (key) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Method = Reflect.getMetadata(
          MetadataKeys.method,
          target.prototype,
          key
      );

      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const bodyProps = Reflect.getMetadata(MetadataKeys.body, target.prototype, key);
      const queryProps = Reflect.getMetadata(MetadataKeys.query, target.prototype, key);
      const paramsProps = Reflect.getMetadata(MetadataKeys.params, target.prototype, key);

      if (path) {
        AppRouter.instanse[method](
            `${routePrefix}${path}`,
            ...middlewares,
            validator(queryProps, MetadataKeys.query),
            validator(bodyProps, MetadataKeys.body),
            validator(paramsProps, MetadataKeys.params),
            routeHandler
        );
      }
    }
  }
};

export {controller};

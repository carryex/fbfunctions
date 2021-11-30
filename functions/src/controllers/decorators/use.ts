import "reflect-metadata";
import {RequestHandler} from "express";
import {MetadataKeys} from "./MetadataKeys";

const use =
  (middleware: RequestHandler) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (target: Record<string, unknown>, key: string, desc: PropertyDescriptor):void => {
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
      middlewares.push(middleware);
      Reflect.defineMetadata(
          MetadataKeys.middleware,
          [...middlewares, middleware],
          target,
          key
      );
    };

export {use};

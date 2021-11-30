/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import Joi from "@hapi/joi";
import {MetadataKeys} from "./MetadataKeys";

export interface JoiModelObject {
  [key: string]: Joi.Schema;
}

const validateBinder =
  (type: MetadataKeys.body | MetadataKeys.query| MetadataKeys.params) =>
    (obj: Joi.ObjectSchema<any> | JoiModelObject) =>
      (target: any, key: string, desc: PropertyDescriptor):void => {
        let schema: Joi.ObjectSchema<any> | undefined;
        if (obj) {
          schema = Joi.isSchema(obj) ?
            (obj as Joi.ObjectSchema<any>) :
            Joi.object(obj as JoiModelObject);
        }
        if (schema === undefined) {
          throw Error(`${type} schema required`);
        }

        Reflect.defineMetadata(MetadataKeys[type], schema, target, key);
      };


const body = validateBinder(MetadataKeys.body);
const params = validateBinder(MetadataKeys.params);
const query = validateBinder(MetadataKeys.query);

const schema = Joi.object.bind(Joi);
const {
  alternatives,
  any,
  array,
  binary,
  boolean,
  date,
  link,
  number,
  object,
  string,
  symbol,
} = Joi.types();

export {
  body,
  query,
  params,
  alternatives,
  any,
  array,
  binary,
  boolean,
  date,
  link,
  number,
  object,
  string,
  symbol,
  schema,
  Joi,
};

// const validate = (model: ValidateModel):any => {
//   let querySchema: Joi.ObjectSchema<any> | undefined;
//   let bodySchema: Joi.ObjectSchema<any> | undefined;
//   let paramsSchema: Joi.ObjectSchema<any> | undefined;

//   if (model.query) {
//     querySchema = Joi.isSchema(model.query) ?
//       (model.query as Joi.ObjectSchema<any>) :
//       Joi.object(model.query as JoiModelObject);
//   }

//   if (model.body) {
//     bodySchema = Joi.isSchema(model.body) ?
//       (model.body as Joi.ObjectSchema<any>) :
//       Joi.object(model.body as JoiModelObject);
//   }

//   if (model.params) {
//     paramsSchema = Joi.isSchema(model.params) ?
//       (model.params as Joi.ObjectSchema<any>) :
//       Joi.object(model.params as JoiModelObject);
//   }

//   if (
//     querySchema === undefined &&
//     bodySchema === undefined &&
//     paramsSchema === undefined
//   ) {
//     throw Error("Query, Body or Params schema required");
//   }

//   return function(
//       scope: unknown,
//       methodName: string,
//       descriptor: PropertyDescriptor
//   ): void {
//     const original = descriptor.value;
//     console.log(original);

//     descriptor.value = function(
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) {
//       if (querySchema) {
//         const queryResult = querySchema.validate(req.query);
//         if (queryResult.error) {
//           return res
//               .status(400)
//               .json({message: "Query Error " + queryResult.error.message});
//         }
//       }

//       if (bodySchema) {
//         const bodyResult = bodySchema.validate(req.body);
//         if (bodyResult.error) {
//           return res
//               .status(400)
//               .json({message: "Body Error " + bodyResult.error.message});
//         }
//       }

//       if (paramsSchema) {
//         const paramsResult = paramsSchema.validate(req.params);
//         if (paramsResult.error) {
//           return res
//               .status(400)
//               .json({message: "Params Error " + paramsResult.error.message});
//         }
//       }
//       return original.apply(this, [req, res, next]);
//     };
//   };
// };

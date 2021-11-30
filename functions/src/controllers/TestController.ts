import {Request, Response} from "express";
import {controller, get, schema, Joi, body, query, number, post, del, string} from "./decorators";

/** Define statement controller */
@controller("/test")
class TestController {
  /**
   * Test get request.
   * @param {Request} req The Request.
   * @param {Response} res The Response.
   */
  @get("/")
  @query({page: number.required(), count: number})
  getRoute(req: Request, res: Response):void {
    const {page, count} = req.query;
    res.send(`page: ${page}, count: ${count}`);
  }

  /**
   * Test post request.
   * @param {Request} req The Request.
   * @param {Response} res The Response.
   */
  @post("/")
  @body(schema({
    a: Joi.number().min(1).max(10).integer().required(),
    b: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }))
  postRoute(req: Request, res: Response):void {
    const {a, b} = req.body;
    res.send(`a: ${a}, b: ${JSON.stringify(b)}`);
  }

  /**
   * Test del request.
   * @param {Request} req The Request.
   * @param {Response} res The Response.
   */
  @del("/")
  @query({id: string.required()})
  deleteRoute(req: Request, res: Response):void {
    const {id} = req.query;
    res.send(`id: ${id}`);
  }
}
export {TestController};


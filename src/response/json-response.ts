import * as express from "express";
import constants from "./constants";
class ResponseGenerator {
  /**
   * sendResponse method is used to map success response with definite structure for whole api
   * @param res
   * @param data
   */
  sendResponse(res: express.Response, data: any) {
    res.status(200);
    res.send({ ...data });
  }

  /**
   * sendError method is used to map error response
   * it will check if constants contains predefined error code than it will send status of particular message else it will shoot 500
   * @param res
   * @param code
   */
  sendError(res: express.Response, code: any) {
    if (constants.ERROR_CODES[code]) {
      res.status(constants.ERROR_CODES[code].status);
      res.send({ message: constants.ERROR_CODES[code].message });
    } else {
      res.status(500);
      res.send({ message: code || "Something went wrong" });
    }
  }
}

export default new ResponseGenerator();

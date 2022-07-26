import * as express from "express";
import uploadHelper from "./../../helper/upload";
import responseGenerator from "../../response/json-response";
class UploadController {
  async uploadFile(req: express.Request, res: express.Response) {
    try {
      const uplaodSuccess = await uploadHelper.createFile(req, res);
      if (!uplaodSuccess) {
        throw new Error("Something went wrong");
      }
      responseGenerator.sendResponse(res, { uplaodSuccess });
    } catch (error: any) {
      responseGenerator.sendError(res, error.message);
    }
  }
}

export default new UploadController();

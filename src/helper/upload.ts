import * as multer from "multer";
import * as formData from "form-data";
import * as fs from "fs";
import * as path from "path";
const uploadDirectory = path.resolve(__dirname + "./uploads-directory");
var storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, uploadDirectory);
  },
  filename: function (req: any, file: any, cb: any) {
    console.log(file, "file");
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
}).array("file", 5);

class UploadHelper {
  createFile(req: any, res: any) {
    return new Promise((resolve, reject) => {
      upload(req, res, async (err: any) => {
        try {
          if (err) {
            reject(err);
          }

          let document_data: any = {};
          document_data["recordid"] = req.body.recordid;
          document_data["assigned_user_id"] = process.env.VT_ASSIG_USER;
          document_data["attachment"] = req.files;

          console.log(document_data, "a");

          console.log(document_data, "document");
          var fileData = new formData();
          fileData.append("document", JSON.stringify(document_data));
          for (var index = 0; index < req.files.length; index++) {
            let currentFile = req.files[index];
            let fileWithInfo = fs.createReadStream(
              uploadDirectory + "/" + currentFile.filename
            );
            fileData.append("files[]", fileWithInfo);

            fs.unlink(uploadDirectory + "/" + currentFile.filename, (err) => {
              if (err) console.log(err);
            });
          }

          // console.log(document);
          resolve(document);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

export default new UploadHelper();

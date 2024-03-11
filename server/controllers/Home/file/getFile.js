import File from "../../../Models/File.js";

const getFile = (req, res) => {
  const fileId = req.params.fileId;
  File.findById(fileId)
    .then((file) => {
      return res.status(200).json(file);
    })
    .catch((error) => {
      return res.status(403).json(error);
    });
};

export default getFile;

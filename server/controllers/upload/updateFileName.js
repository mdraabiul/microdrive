import File from "../../Models/File.js";

const updateFileName = async (req, res) => {
  const { value, fileId } = req.body.data;

  File.findByIdAndUpdate(fileId, {
    name: value,
  })
    .then((file) => {
      return res.status(200).json(file._id);
    })
    .catch((err) => {
      return res.status(403).json(err);
    });
};

export default updateFileName;

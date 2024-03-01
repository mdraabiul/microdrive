import File from "../../Models/File.js";

const showFiles = async (req, res) => {
  const userId = await req.params.userId;

  File.find({ userId })
    .sort({ createdAt: -1 })
    .then((files) => {
      return res.status(200).json(files);
    })
    .catch(() => {
      return res.status(403).json("no file found");
    });
};

export default showFiles;

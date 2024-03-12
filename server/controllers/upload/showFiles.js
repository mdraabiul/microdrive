import File from "../../Models/File.js";

const showFiles = async (req, res) => {
  const userId = await req.params.userId;
  const page = parseInt(await req.query.page);
  const limit = parseInt(await req.query.limit);

  File.find({ userId })
    .select("-cFile")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .then((files) => {
      return res.status(200).json(files);
    })
    .catch(() => {
      return res.status(403).json("no file found");
    });
};

export default showFiles;

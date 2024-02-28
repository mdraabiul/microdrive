import File from "../../Models/File.js";

const upload = async (req, res) => {
  const { cFile, name, type, size, userId } = await req.body;

  const newFile = new File({
    cFile,
    name,
    type,
    size,
    userId,
    createdAt: Date.now(),
  });

  newFile
    .save()
    .then((file) => {
      return res.status(201).json(file);
    })
    .catch((error) => {
      return res.status(403).json(error);
    });
};

export default upload;

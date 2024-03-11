import File from "../../Models/File.js";

const upload = async (req, res) => {
  const { cFile, name, type, size, userId } = await req.body;

  const newFile = await new File({
    cFile,
    name,
    type,
    size,
    userId,
    createdAt: Date.now(),
  });

  newFile
    .save()
    .then((response) => {
      return res.status(201).json(response);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
};

export default upload;

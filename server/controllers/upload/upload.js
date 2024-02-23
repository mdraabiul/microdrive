import File from "../../Models/File.js";

const upload = async (req, res) => {
  const { cFile, name, type, size } = await req.body;

  try {
    const newFile = new File({
      cFile,
      name,
      type,
      size,
    });

    newFile.save().then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export default upload;

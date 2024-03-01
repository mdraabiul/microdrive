import File from "../../Models/File.js";

const deleteFile = async (req, res) => {
  const fileId = await req.body.fileId;
  const userId = await req.body.userId;

  try {
    console.log(userId);
    const deletedFile = await File.findByIdAndDelete(fileId);
    if (deletedFile) {
      res.status(200).json('file deleted');
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

export default deleteFile;

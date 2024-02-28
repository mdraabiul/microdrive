import axios from "axios";
import convertToBase64 from "./convertToBase64";
import baseUrl from "./baseUrl";

const uploadFile = async (e, user) => {
  try {
    const file = e.target.files[0];
    const cFile = await convertToBase64(file);
    const res = await axios.post(`${baseUrl}/upload`, {
      cFile,
      name: file.name,
      type: file.type,
      size: file.size,
      userId: user.userId,
    });

    if (res) return res;
  } catch (error) {
    return error;
  }
};

export default uploadFile;

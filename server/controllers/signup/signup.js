import User from "../../Models/User.js";
import { hash, genSalt } from "bcrypt";

const signup = async (req, res) => {
  const email = req.body.email;
  const password = await hash(req.body.password, 10);

  try {
    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return res.status(403).json("User already exists");
    }

    const newUser = new User({ email, password });
    await newUser.save();
    return res.status(201).json("user created");


  } catch (err) {
    return res.status(500).json(err);
  }
};

export default signup;

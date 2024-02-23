import bcrypt from "bcrypt";
import User from "../../Models/User.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  try {
    if (user) {

        const passwordSame = await bcrypt.compare(password, user.password);
        if(passwordSame){
          const SECRET = process.env.SECRET;
          const token = jwt.sign({
            email : user.email,
            userId : user._id,
          }, SECRET, { expiresIn: '1h' });
          
           return res.status(200).json(token)
        }else {
            return res.status(403).json('passord is not same')
        }

    } else {
        return res.status(403).json('user does not exist');
    }


  } catch (err) {
    return res.status(500).json(err);
  }
};

export default login;

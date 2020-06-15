import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(401).json({ errors: "Schema is invalid" });
    }

    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    return res.json(user);
  }
}

export default new UserController();

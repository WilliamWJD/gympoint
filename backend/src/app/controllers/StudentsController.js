import * as Yup from "yup";
import Student from "../models/Student";

class StudentsController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(401).json({ errors: "Schema is invalid" });
    }

    const { email } = req.body;

    const checkStudent = await Student.findOne({
      where: {
        email,
      },
    });

    if (checkStudent) {
      return res
        .status(401)
        .json({ errors: "Estudante já cadastrado no banco de dados" });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }
}

export default new StudentsController();

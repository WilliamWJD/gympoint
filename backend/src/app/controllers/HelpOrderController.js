import * as Yup from "yup";
import HelpOrder from "../models/HelpOrder";
import Student from "../models/Student";

class HelpOrderController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(401).json({ errors: "Schema is invalid" });
    }

    const { id } = req.params;
    const { question } = req.body;

    // VERIFICA SE O ALUNO EXISTE NO BANCO
    const checkStudent = await Student.findByPk(id);

    if (!checkStudent) {
      return res.status(401).json({ errors: "Student not found" });
    }

    const helporder = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json(helporder);
  }
}

export default new HelpOrderController();

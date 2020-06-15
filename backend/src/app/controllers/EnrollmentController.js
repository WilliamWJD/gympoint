import { add, parseISO } from "date-fns";
import * as Yup from "yup";
import Enrollment from "../models/Enrollment";
import Plan from "../models/Plan";

class EnrollmentController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(401).json({ errors: "Schema is invalid" });
    }

    const { student_id, plan_id, start_date } = req.body;

    // VERIFICA SE O ALUNO JÁ SE ENCONTRA MATRICULADO EM UM PLANO
    const checkStudentEnrollment = await Enrollment.findOne({
      where: { student_id },
    });

    if (checkStudentEnrollment) {
      return res
        .status(401)
        .json({ errors: "The student already has an active enrollment" });
    }

    // RECUPERA INFORMAÇÕES DO PLANO SELECIONADO
    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ errors: "Plan not found" });
    }

    // CALCULA A DATA FINAL DA MATRICULA COM BASE NO PLANO SELECIONADO
    const end_date = add(parseISO(start_date), { months: plan.duration });

    // CALCULA O VALOR TOTAL DO PLANO SELECIONADO
    const priceTotal = plan.price * plan.duration;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      price: priceTotal,
      end_date,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();

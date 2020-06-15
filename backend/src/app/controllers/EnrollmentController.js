import { add, parseISO, format } from "date-fns";
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

    // RECUPERA INFORMAÇÕES DO PLANO SELECIONADO
    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ errors: "Plan not found" });
    }

    // CALCULA A DATA FINAL DA MATRICULA COM BASE NO PLANO SELECIONADO
    const end_date = add(parseISO(start_date), { months: plan.duration });
    const formattedEndDate = format(end_date, "yyyy-MM-dd");

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date: formattedEndDate,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();

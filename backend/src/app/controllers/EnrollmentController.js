import { add, parseISO, format } from "date-fns";
import * as Yup from "yup";

import Enrollment from "../models/Enrollment";
import Plan from "../models/Plan";
import Student from "../models/Student";

import Mail from "../../lib/Mail";

class EnrollmentController {
  async index(req, res) {
    const enrollment = await Enrollment.findAll({
      include: [
        {
          model: Student,
          as: "Student",
          attributes: ["id", "name", "idade", "peso", "altura"],
        },
        {
          model: Plan,
          as: "Plan",
          attributes: ["id", "title", "duration", "price"],
        },
      ],
    });
    return res.json(enrollment);
  }

  async show(req, res) {
    const { enrollment_id } = req.params;

    const enrollment = await Enrollment.findOne({
      where: {
        id: enrollment_id,
      },
      include: [
        {
          model: Student,
          as: "Student",
          attributes: ["id", "name", "idade", "peso", "altura"],
        },
        {
          model: Plan,
          as: "Plan",
          attributes: ["id", "title", "duration", "price"],
        },
      ],
    });

    if (!enrollment) {
      return res.status(401).json({ error: "Enrollment not found" });
    }

    return res.json(enrollment);
  }

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

    // CALCULA O VALOR TOTAL DO PLANO SELECIONADO
    const priceTotal = plan.price * plan.duration;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      price: priceTotal,
      end_date,
    });

    const { name, email } = await Student.findByPk(student_id);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: "Bem-Vindo (a) ao Gympoint",
      template: "welcome",
      context: {
        name,
        title: plan.title,
        start_date: format(enrollment.start_date, "dd-MM-yyyy"),
        end_date: format(enrollment.end_date, "dd-MM-yyyy"),
        price: enrollment.price,
      },
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();

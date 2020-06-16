import { startOfWeek, endOfWeek } from "date-fns";
import { Op } from "sequelize";
import Checkin from "../models/Checkin";
// import Student from "../models/Student";

class CheckinController {
  async index(req, res) {
    const check = await Checkin.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    return res.json(check);
  }

  async store(req, res) {
    const { id } = req.params;

    const startWeek = startOfWeek(new Date());
    const endWeek = endOfWeek(new Date());

    // VERIFICA QUANTIDADE DE CHCKINS DO USUÁRIOS EM UMA SEMANA
    const quantityCheckin = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [startWeek, endWeek],
        },
      },
    });

    if (quantityCheckin.length >= 5) {
      return res.status(401).json({
        errors:
          "The maximum number of checkin allowed per week has been exceeded",
      });
    }

    const check = await Checkin.create({
      student_id: id,
    });

    return res.json(check);
  }
}

export default new CheckinController();

import Checkin from "../models/Checkin";
// import Student from "../models/Student";

class CheckinController {
  async index(req, res) {
    const check = await Checkin.findAll({
      where: {
        id: req.params.id,
      },
    });

    return res.json(check);
  }

  async store(req, res) {
    const { id } = req.params;
    const check = await Checkin.create({
      student_id: id,
    });
    return res.json(check);
  }
}

export default new CheckinController();

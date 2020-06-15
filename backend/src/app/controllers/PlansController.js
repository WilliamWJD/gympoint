import * as Yup from "yup";
import Plan from "../models/Plan";

class PlansController {
  async index(req, res) {
    const plan = await Plan.findAll();
    return res.json(plan);
  }

  async show(req, res) {
    const { plan_id } = req.params;

    const plan = await Plan.findOne({
      where: {
        id: plan_id,
      },
    });

    if (!plan) {
      return res.status(401).json({ errors: "Plan not found" });
    }

    return res.json(plan);
  }

  async store(req, res) {
    const Schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(401).json({ errors: "Schema is invalid" });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const Schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(401).json({ errors: "Schema is invalid" });
    }

    const { plan_id } = req.params;

    const plan = await Plan.findOne({
      where: {
        id: plan_id,
      },
    });

    if (!plan) {
      return res.status(401).json({ errors: "Plan not found" });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { plan_id } = req.params;

    const plan = await Plan.findOne({
      where: {
        id: plan_id,
      },
    });

    if (!plan) {
      return res.status(401).json({ errors: "Plan not found" });
    }

    plan.destroy();

    return res.json({});
  }
}

export default new PlansController();

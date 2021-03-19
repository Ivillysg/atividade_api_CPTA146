const User = require("../models/user");

class UserController {
  async index(req, res) {
    const { age, cell } = req.query;
    if (age) {
      const users = await User.find({ age: age });
      return res.json({
        data: users,
      });
    }
    if (cell) {
      const user = await User.find({ cell: cell });
      return res.json({
        data: user,
      });
    } else {
      const users = await User.find();
      return res.json({
        data: users,
      });
    }
  }
  async store(req, res) {
    const { name, cpf, age, cell } = req.body;
    const existCell = await User.find({ cell: cell });
    if (existCell.length === 0) {
      if (cell.length === 11) {
        const user = await User.create({ name, cpf, age, cell });
        return res.json(user);
      } else {
        return res
          .status(400)
          .json({ error: "O número de celular deve conter 11 digitos." });
      }
    } else {
      return res.status(404).json({ error: "Celular já cadastrado!" });
    }
  }

  async show(req, res) {
    const existUser = await User.findById({ _id: req.params.id });
    if (!existUser) {
      return res.status(404).json({ error: "User não encontrado!" });
    }
    return res.json(existUser);
  }

  async update(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "Usuario não encontrado",
      });
    }
    const { cell } = req.body;
    if (cell.length !== 11) {
      return res
        .status(400)
        .json({ error: "Numero do celular deve conter 11 digitos." });
    }
    await user.updateOne(req.body);
    return res.status(200).json({ data: req.body });
  }

  async destroy(req, res) {
    return res.status(200).json({
      data: await User.findOneAndRemove({ _id: req.params.id }),
    });
  }
}

module.exports = new UserController();

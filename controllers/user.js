const Sequelize = require("sequelize");
const User = require("../models").user_account;
const UserDetail = require("../models").user_detail;
const service = require("../services");

const Op = Sequelize.Op;

module.exports = {
  async list(req, res) {
    const data = await User.findAll({
      where: {
        deleted_at: {
          [Op.eq]: null
        }
      },
      order: [["created_at", "DESC"]]
    });
    return res.status(200).json({
      status: true,
      message: data.length === 0 ? "No results found" : "",
      data
    });
  },
  async getById(req, res) {
    const data = await User.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }
    return res.status(200).json({
      status: true,
      message: "",
      data
    });
  },
  async add(req, res) {
    req.body.ip_address = req.connection.remoteAddress;
    req.body.updated_by = req.body.id_user | 1;
    req.body.created_by = req.body.id_user | 1;
    await User.create(req.body);
    return res.status(201).json({
      status: true,
      message: "User was created successfully"
    });
  },
  async update(req, res) {
    var data = await User.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }
    req.body.update_by = req.id_user;
    data = await data.update(req.body);
    return res.status(200).json({
      status: true,
      message: "User has been updated successfully"
    });
  },
  async delete(req, res) {
    var data = await User.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "User not found"
      });
    }
    data = await data.update({
      deleted_at: new Date(),
      deleted_by: req.id_user
    });
    return res.status(200).json({
      status: true,
      message: "User has been removed successfully"
    });
  },
  async login(req, res) {
    const data = await User.findOne({ 
      where: 
      { 
        email: req.body.email,
        deleted_at: {
          [Op.eq]: null
        }
      } 
    });
    if (!data) {
      return res.status(400).json({
        status: true,
        message: "Invalid username or incorrect password"
      });
    }
    if (await data.validPassword(req.body.password)) {
      console.log("entro");
      return res.status(200).json({
        status: true,
        message: "Successfully logged in",
        data: {
          id_user: data.id_user,
          email: data.email,
          token: service.createToken(data)
        }
      });
    } else {
      return res.status(400).json({
        status: true,
        message: "Invalid username or incorrect password"
      });
    }
  }
};

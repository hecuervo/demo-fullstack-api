const csv = require("csvtojson");
const DataBase = require("../models").data_base;
const moment = require("moment");
const parser = new (require("simple-excel-to-json")).XlsParser();

module.exports = {
  async list(req, res) {
    const data = await DataBase.findAll({limit: 50});
    return res.status(200).json({
      status: true,
      message: data.length === 0 ? "No results found" : "",
      data
    });
  },
  async getById(req, res) {
    const data = await DataBase.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Register not found"
      });
    }
    return res.status(200).json({
      status: true,
      message: "",
      data
    });
  },
  async add(req, res) {
    req.body.updated_by = req.id_user;
    req.body.created_by = req.id_user;

    console.log(req.body);

    const data = await DataBase.create(req.body);
    return res.status(201).json({
      status: true,
      message: "Register in data base was created successfully"
    });
  },
  async update(req, res) {
    var data = await DataBase.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Register not found"
      });
    }
    req.body.updated_by = req.id_user;
    data = await data.update(req.body);
    return res.status(200).json({
      status: true,
      message: "Register has been updated successfully"
    });
  },
  async delete(req, res) {
    var data = await DataBase.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Register not found"
      });
    }
    data = await data.update({
      deleted_at: new Date(),
      deleted_by: req.id_user
    });
    return res.status(200).json({
      status: true,
      message: "data_base has been removed successfully"
    });
  },
  async upload(req, res) {
    if (!req.files) {
      return res.status(400).json({
        estatus: false,
        message: "File is missing"
      });
    }

    // Get file name
    const file = req.files.name;
    const shortName = file.name.split(".");
    const fileExt = shortName[shortName.length - 1];

    const validExtensions = ["csv"];

    if (validExtensions.indexOf(fileExt) < 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid extansions, only valid" + validExtensions.join(", ")
      });
    }
    const fileName = `${moment().format()}.${fileExt}`;
    const path = `./uploads/data-base/${fileName}`;

    await file.mv(path);

    const jsonArray = await csv().fromFile(path);
    row = 0;
    jsonArray.forEach(async item => {
      row++;
      if (item.NOMBRE != "") {
        data = {
          updated_by: req.id_user,
          created_by: req.id_user,
          policy_id: item.policy_id,
          statecode: item.statecode,
          county: item.county,
          eq_site_limit: item.eq_site_limit,
          hu_site_limit: item.hu_site_limit,
          fl_site_limit: item.fl_site_limit,
          fr_site_limit: item.fr_site_limit,
          tiv_2011: item.tiv_2011,
          tiv_2012: item.tiv_2012,
          eq_site_deductible: item.eq_site_deductible,
          hu_site_deductible: item.hu_site_deductible,
          fl_site_deductible: item.fl_site_deductible,
          fr_site_deductible: item.fr_site_deductible,
          point_latitude: item.point_latitude,
          point_longitude: item.point_longitude,
          construction: item.construction,
          point_granularity: item.point_granularity
        };
        try {
          await DataBase.create(data);
          if (row == jsonArray.length) {
            return res.status(200).json({
                status: true,
                message: "File upload successfully"
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
};

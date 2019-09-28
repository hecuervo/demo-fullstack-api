const services = require("../services");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized"
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  services
    .decodeToken(token)
    .then(response => {
      req.id_user = response.sub;
      next();
    })
    .catch(response => {
      res.status(401).json({
        status: false,
        response
      });
    });
}

module.exports = isAuth;

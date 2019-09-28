const jwt = require("jsonwebtoken");
const moment = require("moment");
const SECRET_TOKEN = process.env.SECRET_TOKEN_JWT;

function createToken(user) {
  const payload = {
    sub: user.id_user,
    iat: moment().unix(),
    exp: moment()
      .add(14, "days")
      .unix()
  };
  return jwt.sign(payload, SECRET_TOKEN);
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    const payload = jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
      console.log(err);
      console.log(decoded);
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });

  return decoded;
}

module.exports = {
  createToken,
  decodeToken
};

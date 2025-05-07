const jwt = require("jsonwebtoken");

const decodToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_WORD);
  } catch (error) {
    console.log({ error });
    return "error";
  }
};

module.exports = decodToken;

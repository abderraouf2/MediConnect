const connectToDB = require("./config/BDConnection.js");
// require("dotenv").config();

connectToDB();
const app = require("./app.js");
const server = require("http").Server(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on  http://localhost:${PORT}`);
});

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userUuid = decodedToken.userUuid;
    if (req.body.userUuid && req.body.userUuid !== userUuid) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    console.log(req.headers.authorization);
    console.log(error);
    res.status(401).json({ error: "requête non authentifiée !" });
  }
};

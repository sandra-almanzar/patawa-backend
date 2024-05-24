import jwt from "jsonwebtoken";

export default (request, response, next) => {
  const authorization = request.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.userId) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const { userId, email } = decodedToken;

  request.user = { userId, email };

  next();
};

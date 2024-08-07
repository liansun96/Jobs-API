const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { user: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide email & password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invilid Crendentials");
  }

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({user : {user : user.name} , token})
};

module.exports = { register, login };

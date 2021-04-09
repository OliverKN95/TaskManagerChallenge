import User from '../models/User'

export const getUsers = async (req, res) => {
    const users = await User.find().populate("roles");
    res.json(users);
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
}

export const deleteUserById = async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(deletedUser);
}
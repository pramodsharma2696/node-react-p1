import User from '../models/userModel.js';

const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const savedUser = await newUser.save();
        res.status(200).json({ message: "User created successfully"});
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData) {
            return res.status(404).json({ message: "User data not found" });
        }
        res.status(200).json({ message: "User created successfully", data: userData });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found successfully", data: user });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


export default {
    getAll,
    getById,
    create,
    update,
    deleteUser,
};
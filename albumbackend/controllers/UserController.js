const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secret');

const prisma = new PrismaClient();

const hashSync = bcrypt.hashSync;
const compareSync = bcrypt.compareSync;

const getUser = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch (error) {
        console.error('Error in fetching user:', error);
        res.status(500).json({ success: false, message: "Error in fetching user" });
    }
};

const postUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, address,photoUrl } = req.body;

        let user = await prisma.user.findFirst({ where: { email } });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashSync(password, 10),
                age,
                address,
                photoUrl
            }
        });

        const { password: _password, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Error in posting user:', error);
        res.status(500).json({ success: false, message: "Error in posting user" });
    }
};

const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password, age, address,photoUrl } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { firstName, lastName, email, password, age, address,photoUrl }
        });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error in updating user:', error);
        res.status(500).json({ success: false, message: "Error in updating user" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.json(deletedUser);
    } catch (error) {
        console.error('Error in deleting user:', error);
        res.status(500).json({ success: false, message: "Error in deleting user" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }

        if (!compareSync(password, user.password)) {
            return res.status(400).json({ success: false, message: "Incorrect Password" });
        }
        delete user.password;
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ user, token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ success: false, message: "Error in login" });
    }
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
    login
};

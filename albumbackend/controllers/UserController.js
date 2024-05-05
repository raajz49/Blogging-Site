const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUser = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in fetching User" });
    }
};

const postUser = async (req, res) => {
    try {
        const newUser = await prisma.user.create({ data: req.body });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in Posting User" });
    }
};

const putUser = async (req, res) => {
    try {
        const id = req.params.id;
        const newFirstName = req.body.firstName;
        const newLastName = req.body.lastName;
        const newAge = req.body.age;
        const newAddress = req.body.address;
        const newEmail = req.body.email;
        const newId = req.body.id;

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { age: newAge, firstName: newFirstName, lastName: newLastName, email: newEmail, address: newAddress, id: newId }
        });
        
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in Updating User" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in deleting User" });
    }
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
};

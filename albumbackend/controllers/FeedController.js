const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFeed = async (req, res) => {
    try {
        const userId = req.user.id;

        const allPosts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                userId: true,
                user: {
                    select: {
                        photoUrl: true,
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });

        // Filter out posts created by the user
        const filteredPosts = allPosts.filter(post => post.userId !== userId);

        res.json(filteredPosts);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in getting posts of user" });
    }
}

module.exports = { getFeed };

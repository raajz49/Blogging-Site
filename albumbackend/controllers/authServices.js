const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

const {hashToken}=require('../src/utils/hashToken');

function addRefreshTokenToWhitelist({jti,refreshToken,userId}){
    return prisma.user.refreshToken.create({
        data:{
            id:jti,
            hashedToken:hashToken(refreshToken),
            userId
        }
    })
}

function findRefreshTokenById(id){
    return db.refreshToken.findUnique({
        where:{
            id,
        }
    })
}
// soft delete tokens after usage.
function deleteRefreshToken(id) {
    return db.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true
      }
    });
  }
  
  function revokeTokens(userId) {
    return db.refreshToken.updateMany({
      where: {
        userId
      },
      data: {
        revoked: true
      }
    });
  }
  
  module.exports = {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
  };
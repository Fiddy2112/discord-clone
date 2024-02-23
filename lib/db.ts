import { PrismaClient } from '@prisma/client'


// (async () => {
//   try {
//     console.log(await prisma.widget.create({ data: { } }));
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     prisma.$disconnect();
//   }
// })();

const prismaClientSingleton = () => {
    return new PrismaClient()
  }
  
  declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
  }
  
  const prisma = globalThis.prisma ?? prismaClientSingleton();
  
  export default prisma;
  
  if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

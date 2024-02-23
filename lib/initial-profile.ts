import { currentUser,redirectToSignIn } from "@clerk/nextjs";
import prisma from '@/lib/db'

export const initalProfile = async ()=> {
    var user = await currentUser();

    if(!user) {
        return redirectToSignIn();
    }

    const profile = await prisma.profile.findUnique({
        where:{
            userId : user.id
        }
    })

    if(profile){
        return profile;
    }

    console.log('profile',profile);
    console.log('user',user);
    

    const newProfile = await prisma.profile.create({
        data:{
            userId: user.id,
            name:`${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })

    return newProfile;
}
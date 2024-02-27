import { initalProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { InitialModal } from "@/components/modals/initital-modal";

const SetupPage = async () => {
    const profile = await initalProfile();

    const server = await prisma.server.findFirst({
        where: {
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })
    
    // console.log(profile);
    // console.log(server);
    


    if(server){
        return redirect(`/servers/${server.id}`)
    }
    return <InitialModal/>;
    
}

export default SetupPage;
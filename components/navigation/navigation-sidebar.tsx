import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import prisma from '@/lib/db';
import { NavigationAction } from "./navigation-action";


const NavigationSidebar = async ()=> {

    const profile = await currentProfile();

if(!profile){
    return redirect('/');
}

const server = await prisma.server.findMany({
    where: {
        members:{
            some:{
                profileId: profile.id
            }
        }
    }
})

return(
    <div className="flex flex-col items-center space-y-4 h-full w-full text-primary py-3 dark:bg-[#1E1F22]">
        <NavigationAction/>
    </div>
)
}

export default NavigationSidebar;
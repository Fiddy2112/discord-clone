import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import prisma from '@/lib/db';
import { NavigationAction } from "./navigation-action";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { UserButton } from "@clerk/nextjs";



const NavigationSidebar = async ()=> {

    const profile = await currentProfile();

if(!profile){
    return redirect('/');
}

const servers = await prisma.server.findMany({
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
        <Separator
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
        />
        <ScrollArea className="flex-1 w-full">
            {servers.map((server)=>(
                <div key={server.id}>
                    <NavigationItem
                    id={server.id}
                    name={server.name}
                    imageUrl={server.imageUrl}
                    />
                </div>
            ))}
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
            <ModeToggle/>
            <UserButton
            afterSignOutUrl="/"
            appearance={{
                elements:{
                    avatarBox:"w-[48px] h-[48px] "
                }
            }}
            />
        </div>
    </div>
)
}

export default NavigationSidebar;
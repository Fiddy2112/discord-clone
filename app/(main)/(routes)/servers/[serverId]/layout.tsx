import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";

interface ServerIdLayoutProps {
    children: React.ReactNode;
    params: {
        serverId: string;
    };
}

const ServerIdLayout = async ({children,params}:ServerIdLayoutProps)=> {
    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn()
    }

    const server = await prisma.server.findUnique({
        where:{
            id:params.serverId,
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    });

    if(!server){
        return redirect("/");
    }
    return(
        <div className="h-full">
            <div className="hidden md:flex w-60 h-full z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId}/>
            </div>
            <main className="h-full md:pl-60">
            {children}
            </main>
        </div>
    )
}

export default ServerIdLayout;
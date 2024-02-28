import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";
import prisma from "@/lib/db"
import { ChannelType } from "@prisma/client";
import { ServerHeader } from "./server-header";

interface ServerSidebarProps{
    serverId:string
}

export const ServerSidebar = async ({serverId}:ServerSidebarProps)=> {
    const profile = await currentProfile();

    if(!profile){
        return redirect('/')
    }

    const server = await prisma.server.findUnique({
        where:{
            id: serverId
        },
        include:{
            channels:{
                orderBy:{
                    createdAt:'asc'
                }
            },
            members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:'asc'
                }
            }
        }
    })

    const textChannel = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannel = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannel = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);

    const members = server?.members.filter((member) => member.profileId !== profile.id);

    if(!server){
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col w-full h-full text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader
            server={server}
            role={role}
            />
        </div>
    )
}
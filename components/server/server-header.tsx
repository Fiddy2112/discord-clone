"use client"

import { ServerWithMembersWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, DoorOpen, FolderPlus, LogOut, PlusCircle, Settings, Trash, UserRoundPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";


interface ServerHeaderProps{
    server: ServerWithMembersWithProfiles;
    role?:MemberRole;
}

export const ServerHeader = ({server,role}:ServerHeaderProps)=> {
    const {onOpen}= useModal();
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;
    return (
       <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
            <button className="w-full h-12 font-sans text-base flex items-center font-semibold px-3 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                {server.name}
                <ChevronDown className="h-5 w-5 ml-auto"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black space-y-[2px] dark:text-neutral-400">
            {isModerator && 
            <>
            <DropdownMenuItem onClick={()=> onOpen("invite",{server})} className="text-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white px-3 py-2 text-sm cursor-pointer">
                Invite People
                <UserRoundPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>

            <DropdownMenuSeparator/>
            </>
            }
            {isAdmin && 
            <DropdownMenuItem className="dark:hover:bg-indigo-600 dark:hover:text-white px-3 py-2 text-sm cursor-pointer">
                Server Settings
                <Settings className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            }
             {isAdmin && <DropdownMenuItem className="dark:hover:bg-indigo-600 dark:hover:text-white px-3 py-2 text-sm cursor-pointer">
                Manager Members
                <Users className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>}
            {isModerator && <DropdownMenuItem className="dark:hover:bg-indigo-600 dark:hover:text-white px-3 py-2 text-sm cursor-pointer">
                Create Channel
                <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>}
            {isModerator && <DropdownMenuItem className="dark:hover:bg-indigo-600 dark:hover:text-white px-3 py-2 text-sm cursor-pointer">
                Create Folder
                <FolderPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>}
            {isModerator &&
            <DropdownMenuSeparator/>
            }
            {isAdmin && <DropdownMenuItem className="text-red-500 dark:text-red-500 dark:hover:bg-[#f23F42] dark:hover:text-white px-3 py-2 text-sm cursor-pointer">
                Delete Server
                <Trash className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>}
             {!isAdmin &&<DropdownMenuItem className="text-red-500 dark:text-red-500 dark:hover:bg-[#f23F42] dark:hover:text-white px-3 py-2 text-sm cursor-pointer">
                Leave Server
                <LogOut className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>}
        </DropdownMenuContent>
       </DropdownMenu>
    )
}
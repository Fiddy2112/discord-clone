"use client"

import * as z from 'zod';
import { Dialog,DialogContent,DialogDescription,DialogTitle,DialogHeader } from "@/components/ui/dialog";

import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAvatar } from '@/components/user-avatar';
import { Check, Copy, RefreshCcw, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { ServerWithMembersWithProfiles } from '@/types';
import { DropdownMenu,DropdownMenuContent,DropdownMenuPortal,DropdownMenuItem,DropdownMenuSeparator } from '@/components/ui/dropdown-menu';


const roleIconMap={
    "GUEST":null,
    "MODERATOR":<ShieldCheck className='w-4 h-4 ml-2 text-indigo-500'/>,
    "ADMIN": <ShieldAlert className='w-4 h-4 text-rose-500 ml-2'/>
}

export const MembersModal = ()=> {
const {isOpen,onOpen,onClose,type,data} = useModal();

const [loadingId,setLoadingId]= useState("");



const {server} = data as {server:ServerWithMembersWithProfiles};

    const isModalOpen = isOpen && type === "members";


   
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="dark:bg-[#313338]  text-white p-0 overflow-hidden">
                <DialogHeader className="py-8 px-6">
                    <DialogTitle className="text-2xl text-center font-medium font-sans text-white">
                    Manager Members
                    </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                    {server?.members?.length}Members
                </DialogDescription>
                </DialogHeader>
                    <ScrollArea className='mt-8 max-h-[420px] pl-6'>
                        {server?.members?.map((member)=> (
                            <div key={member.id} className='flex items-center gap-x-2 mb-6'>
                                <UserAvatar src={member.profile.imageUrl}/>
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex items-center gap-x-1 text-xs font-semibold">
                                        {member.profile.name}
                                        {roleIconMap[member.role]}
                                    </div>
                                    <p className='text-xs text-zinc-500'>{member.profile.email}</p>
                                </div>
                                {server.profileId !== member.profileId && loadingId !== member.id && (
                                    <div className="ml-auto">Actions</div>
                                )}
                            </div>
                        ))}
                    </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
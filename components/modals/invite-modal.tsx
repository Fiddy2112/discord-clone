"use client"

import * as z from 'zod';
import { Dialog,DialogContent,DialogDescription,DialogTitle,DialogHeader } from "@/components/ui/dialog";

import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';
import axios from 'axios';




export const InviteModal = ()=> {
const {isOpen,onOpen,onClose,type,data} = useModal();

const [copied,setCopied] = useState(false);

const [isLoading,setIsLoading]= useState(false)

const origin = useOrigin();


const {server} = data;

    const isModalOpen = isOpen && type === "invite";

const inviteUrl = `${origin}/invite/${server?.inviteCode}`

const onCopy = ()=> {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(()=>{
        setCopied(false);
    },1000)
}

const onNew = async ()=> {
try{
setIsLoading(true);

const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

onOpen("invite",{server:response.data})
}catch(err){
console.log(err);
}finally{
    setIsLoading(false);
}
}
   
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="dark:bg-[#313338]  text-white p-0 overflow-hidden">
                <DialogHeader className="py-8 px-6">
                    <DialogTitle className="text-2xl text-center font-medium font-sans text-white">
                    Invite Friends 
                    </DialogTitle>
                </DialogHeader>
                    <div className='p-6'>
                        <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-gray-400'>Server invite link</Label>
                        <div className='flex items-center mt-2  dark:bg-[#1e1f22] dark:text-gray-400 focus-visible:ring-offset-0'>
                            <Input disabled={isLoading} className='focus-visible:ring-offset-0 border-0 focus-visible:ring-0' value={inviteUrl} />
                            <Button disabled={isLoading} onClick={onCopy} size="icon" className='w-[75px]'>
                                {copied ? <Check className='w-4 h-4'/> : <Copy className='w-4 h-4'/>}
                                
                            </Button>
                        </div>
                        <Button disabled={isLoading} onClick={onNew} variant="link" size='sm' className='text-xs text-zinc-500 dark:text-gray-400'>
                            Generate a new link
                            {/* Edit invitation link */}
                            <RefreshCcw className='w-4 h-4 ml-2'/>
                        </Button>
                    </div>
            </DialogContent>
        </Dialog>
    )
}
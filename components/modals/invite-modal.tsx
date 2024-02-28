"use client"

import * as z from 'zod';
import { Dialog,DialogContent,DialogDescription,DialogTitle,DialogHeader } from "@/components/ui/dialog";

import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';




export const InviteModal = ()=> {
const {isOpen,onOpen,onClose,type} = useModal();


    const isModalOpen = isOpen && type === "invite";


   
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="dark:bg-[#313338]  text-white p-0 overflow-hidden">
                <DialogHeader className="py-8 px-6">
                    <DialogTitle className="text-2xl text-center font-medium font-sans text-white">
                    Invite Friends 
                    </DialogTitle>
                </DialogHeader>
                    <div className='p-6'>
                        <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/80'>Server invite link</Label>
                        <div className='flex items-center mt-2 gap-x-2 dark:bg-[#1e1f22] dark:text-gray-400 focus-visible:ring-offset-0'>
                            <Input className='focus-visible:ring-offset-0 border-0 focus-visible:ring-0' value="invite-link"/>
                            <Button size="icon">
                                <Copy className='w-4 h-4'/>
                            </Button>
                        </div>
                    </div>
            </DialogContent>
        </Dialog>
    )
}
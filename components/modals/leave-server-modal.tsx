"use client"

import * as z from 'zod';
import { Dialog,DialogContent,DialogDescription,DialogTitle,DialogHeader, DialogFooter } from "@/components/ui/dialog";

import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';




export const InviteModal = ()=> {
const {isOpen,onOpen,onClose,type,data} = useModal();

const [copied,setCopied] = useState(false);

const [isLoading,setIsLoading]= useState(false)

const origin = useOrigin();

const router = useRouter()


const {server} = data;

const isModalOpen = isOpen && type === "invite";


const onClick = async ()=> {
    try{
        setIsLoading(true);
        await axios.patch(`/api/servers/${server?.id}/leave`);

        onClose();
        router.refresh();
        router.push('/');
    }catch(err){
        console.log(err)
    }finally{
        setIsLoading(false);
    }
}



   
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="dark:bg-[#313338]  text-white p-0 overflow-hidden">
                <DialogHeader className="py-8 px-6">
                    <DialogTitle className="text-2xl text-center font-medium font-sans text-white">
                    Leave Server
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Are you sure you want to leave <span className='text-indigo-500 font-semibold'>{server?.name}</span> ?
                    </DialogDescription>
                </DialogHeader>
                    <div className='p-6'>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <div className="flex items-center justify-between w-full">
                                <Button 
                                disabled={isLoading}
                                onClick={()=> {onClose}}
                                variant='ghost'
                                >
                                    Cancel
                                </Button>
                                <Button disabled={isLoading}
                                variant="primary"
                                onClick={onClick}
                                >
                                    Confirm
                                </Button>
                            </div>

                        </DialogFooter>
                    </div>
            </DialogContent>
        </Dialog>
    )
}
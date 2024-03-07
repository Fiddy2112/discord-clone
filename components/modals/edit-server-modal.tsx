"use client"

import * as z from 'zod';
import { Dialog,DialogContent,DialogFooter,DialogDescription,DialogTitle,DialogHeader } from "@/components/ui/dialog";
import { Form , FormControl,FormItem,FormField,FormLabel,FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpload } from '@/components/file-upload';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import { useEffect } from 'react';




export const EditServerModal = ()=> {
const {isOpen,onOpen,onClose,type,data} = useModal();

console.log({data});


    const router = useRouter();

    const {server}= data;

    const isModalOpen = isOpen && type === "editServer";

    const formSchema = z.object({
        name: z.string().min(1,{
            message: "Server name is required."
        }),
        imageUrl: z.string().min(1,{
            message:"Server image is required."
        })
    })
    
    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:'',
            imageUrl:''
        }
    })

    useEffect(()=> {
        if(server){
            form.setValue('name',server.name);
            form.setValue('imageUrl',server.imageUrl);
        }
    },[server, form])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>)=> {
        try{
            await axios.patch(`/api/servers/${server?.id}`,values);

           form.reset();
           router.refresh();
           onClose();
        }catch(err){
            console.log(err);
        }
    }

const handleClose = ()=> {
   form.reset();
   onClose();
}
   
    return(
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:bg-[#313338]  text-white p-0 overflow-hidden">
                <DialogHeader className="py-8 px-6">
                    <DialogTitle className="text-2xl text-center font-medium font-sans text-white">
                    Create your initial server
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-gray-400">
                        Your server is where you interact with your friends.
                    </DialogDescription>
                    <DialogDescription className="text-center text-sm text-gray-400">
                        Give your server a personality with a name and an image.You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='space-y-8 px-6'>
                        <div className='flex items-center justify-center text-center'>
                            <FormField 
                            control={form.control} 
                            name="imageUrl"
                            render={({field})=> (
                                <FormItem>
                                    <FormControl>
                                        <FileUpload
                                        endpoint="serverImage"
                                        value={field.value}
                                        onChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>

                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className='uppercase font-bold text-xs dark:text-gray-400'>
                                    Server Name
                                </FormLabel>
                                <FormControl>
                                    <Input className='dark:bg-[#1e1f22] border-0 focus-visible:ring-0 dark:text-gray-400 focus-visible:ring-offset-0' placeholder='Enter server name' {...field} disabled={isLoading}/>
                                </FormControl>
                                <FormMessage className='text-rose-800'/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <DialogFooter className='dark:bg-[#2b2d31] px-6 py-4'>
                            <Button variant='primary' disabled={isLoading}>Save</Button>
                    </DialogFooter>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
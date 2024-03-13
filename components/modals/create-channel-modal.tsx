"use client"

import * as z from 'zod';
import { Dialog,DialogContent,DialogFooter,DialogDescription,DialogTitle,DialogHeader } from "@/components/ui/dialog";
import { Form , FormControl,FormItem,FormField,FormLabel,FormMessage, FormDescription} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpload } from '@/components/file-upload';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import { Checkbox } from "@/components/ui/checkbox"
import { ChannelType } from '@prisma/client';
import { Hash, Volume2 } from 'lucide-react';





export const CreateChannelModal = ()=> {
const {isOpen,onOpen,onClose,type} = useModal();

    const router = useRouter();

    const isModalOpen = isOpen && type === "createChannel";

    const formSchema = z.object({
        name: z.string().min(1,{
            message: "Channel name is required."
        }).refine(
            name => name !== "general",
            {
                message: "Channel name can not be 'general'"
            }
        ),
        type: z.nativeEnum(ChannelType)
    })
    
    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:'',
            type:ChannelType.TEXT
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>)=> {
        try{
            await axios.post("/api/servers",values)

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
                    Create channel
                    </DialogTitle>
                    
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='space-y-8 px-6'>

                    <FormField 
                            control={form.control}
                            name="type"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Channel Type</FormLabel>
                                    <FormDescription>
                                        <RadioGroup                   onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <div className="flex py-2 px-3 bg-[#2b2d31] hover:bg-[#393c41]">
                                                <div className=" flex gap-1 w-[100%] items-center mr-2">
                                                    <Hash className='w-6 h-6 mr-2' />
                                                <div className="flex flex-col">
                                                    <div className="text-xl">Text</div>
                                                    <div className="text-xs">Send messenger, image, GIFs, Emoji,...
                                                    </div>
                                                </div>

                                                </div>
                                                       <div className="flex items-center">
                                                            <RadioGroupItem className='' value="option-one" id="option-one" />
                                                       </div>
                                            </div>

                                            <div className="flex py-2 px-3">
                                                <div className=" flex gap-1 w-[100%] items-center mr-2">
                                                    <Volume2 className='w-6 h-6 mr-2' />
                                                <div className="flex flex-col">
                                                    <div className="text-xl">Audio</div>
                                                    <div className="text-xs">Call, call video,...
                                                    </div>
                                                </div>

                                                </div>
                                                       <div className="flex items-center">
                                                            <RadioGroupItem className='' value="option-one" id="option-one" />
                                                       </div>
                                            </div>
                                        </RadioGroup>
                                    
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className='uppercase font-bold text-xs dark:text-gray-400'>
                                    Channel Name
                                </FormLabel>
                                <FormControl>
                                    <Input className='dark:bg-[#1e1f22] border-0 focus-visible:ring-0 dark:text-gray-400 focus-visible:ring-offset-0' placeholder='Enter channel name' {...field} disabled={isLoading}/>
                                </FormControl>
                                <FormMessage className='text-rose-800'/>
                            </FormItem>
                        )}
                        />
                        
                    </div>
                    <DialogFooter className='dark:bg-[#2b2d31] px-6 py-4'>
                            <Button variant='primary' disabled={isLoading}>Create</Button>
                    </DialogFooter>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
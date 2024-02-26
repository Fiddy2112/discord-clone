"use client"

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

import { X } from "lucide-react";

import Image from "next/image"

import "@uploadthing/react/styles.css"

interface FileUploadProps {
    onChange: (url?:string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage" // Change made here
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
        const fileType = value?.split('.').pop();

    if(value && fileType !== 'pdf'){
        return (
            <div className="relative w-20 h-20">
                <Image fill className="rounded-full object-cover" src={value} alt="Upload"/>
                <button className="absolute top-0 right-0 p-1 rounded-full shadow-sm bg-rose-500 text-white" onClick={()=> onChange("")} type="button"><X className="w-4 h-4"/></button>
            </div>
        )
    }
        
return(
    <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res)=>{
            onChange(res?.[0].url)
    }}
    onUploadError={(error : Error)=> {
    console.log(error);
    }}
/>
)
    
}
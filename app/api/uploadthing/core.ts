import {auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
 
const handleAuth = ()=> {
    const userId = auth();
    if(!userId)throw new Error("Unauthorized");
    return {userId: userId};
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount:1 } })
    // Set permissions and file types for this FileRoute
    .middleware(()=> handleAuth())
    .onUploadComplete(()=> {}),
    messageFile: f(["image", "pdf"]) // Adjusted to correct syntax for specifying file types
    .middleware(()=> handleAuth()) // Fixed syntax error: replaced ':' with '.'
    .onUploadComplete(()=> {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
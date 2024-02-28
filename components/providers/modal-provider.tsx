"use client"

import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";

export const ModalProvider = ()=> {
    const [iseMounted, setIsMounted] = useState(false);

    useEffect(()=> {
        setIsMounted(true);
    },[])

    if(!iseMounted){
        return null;
    }
    return(
        <>
        <CreateServerModal/>
        <InviteModal/>
        </>
    )
}
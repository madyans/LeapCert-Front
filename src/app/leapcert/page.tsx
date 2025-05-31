'use client';
import { useLeapcertModel } from "./leapcert.model";
import { LeapcertView } from "./leapcert.view";

export default function Page() {
    const methods = useLeapcertModel()

    return <LeapcertView {...methods} />
}

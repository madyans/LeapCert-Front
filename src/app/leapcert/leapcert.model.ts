import { useState } from "react";

export const useLeapcertModel = () => {
    const [expandedMember, setExpandedMember] = useState<number | null>(null);

    const toggleMember = (id: number) => {
        if (expandedMember === id) {
            setExpandedMember(null);
        } else {
            setExpandedMember(id);
        }
    };

    return {
        expandedMember, setExpandedMember,
        toggleMember
    }
}
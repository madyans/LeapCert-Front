import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";
import React from "react";

interface LucideIconProps extends LucideProps {
    icon: keyof typeof Icons;
}

export default function LucideIcon({ icon, ...props }: LucideIconProps) {
    const IconComponent = Icons[icon] as React.FC<LucideProps>;

    if (!IconComponent) {
        console.warn(`Icon "${icon}" not found in lucide-react library.`);
        return null;
    }

    return <IconComponent {...props} />;
}

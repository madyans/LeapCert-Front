'use client';

import CourseClientView from "./corsosId.view";
import { useCursosIdModel } from "./cursosId.model";

interface ClientPageProps {
    classId: number;
    isAuthenticated: boolean;
}

export default function ClientPage({ classId, isAuthenticated }: ClientPageProps) {
    const methods = useCursosIdModel(classId, isAuthenticated);

    return <CourseClientView {...methods} />;
}

'use client';

import CourseClientView from "./corsosId.view";
import { useCursosIdModel } from "./cursosId.model";

export default function ClientPage({
    classId,
    isAuthenticated,
}: {
    classId: number;
    isAuthenticated: boolean;
}) {
    const methods = useCursosIdModel(classId, isAuthenticated);

    return <CourseClientView {...methods} />;
}

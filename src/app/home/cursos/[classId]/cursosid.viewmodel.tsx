'use client';

import CourseClientView from "./corsosId.view";
import { useCursosIdModel } from "./cursosId.model";

export default function ClientPage({ classId }: { classId: number }) {
    const methods = useCursosIdModel(classId);

    return <CourseClientView {...methods} />;
}

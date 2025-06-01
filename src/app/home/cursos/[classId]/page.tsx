import { Skeleton } from "@/src/components/ui/skeleton";
import { Suspense } from "react";
import CourseClientView from "./components/course-client-view";

export default async function Page({ params }: { params: Promise<{ classId: number }> }) {
    const { classId } = await params;

    return (
        <Suspense fallback={<Skeleton className="w-full h-24" />}>
            <CourseClientView classId={classId} />
        </Suspense>
    );
}

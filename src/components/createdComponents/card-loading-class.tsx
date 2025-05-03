import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CardLoadingClass({ idx }: { idx: number }) {
    return (
        <>
            <Card
                key={idx}
                className="w-64 h-80 bg-secondary border border-primary/20 rounded-2xl shadow-md animate-pulse"
            >
                <Skeleton className="w-full h-36 rounded-t-2xl" />
                <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-3 w-1/3" />
                </CardContent>
            </Card>
        </>
    )
}
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CardLoadingClass({ idx, compact = false }: { idx: number; compact?: boolean }) {
    return (
        <Card
            key={idx}
            className="h-full min-h-[270px] w-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
        >
            <Skeleton className={`${compact ? "h-32" : "h-40"} w-full rounded-none`} />
            <CardHeader className="space-y-3 p-4 pb-2">
                <div className="flex items-start justify-between gap-3">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-2">
                {!compact ? <Skeleton className="h-4 w-1/2" /> : null}
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                </div>
            </CardContent>
        </Card>
    )
}

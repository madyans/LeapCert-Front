"use client";

import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import useMutateCourseProgressAlertSeen from "../cursos/hooks/mutations/useMutateCourseProgressAlertSeen";
import useQueryGetCourseProgressAlerts from "../cursos/hooks/useQueryGetCourseProgressAlerts";

interface CourseProgressAlertToasterProps {
    enabled: boolean;
}

export default function CourseProgressAlertToaster({ enabled }: CourseProgressAlertToasterProps) {
    const router = useRouter();
    const displayedAlertsRef = useRef<Set<number>>(new Set());
    const { data: alerts = [] } = useQueryGetCourseProgressAlerts(enabled);
    const { mutate: markSeen } = useMutateCourseProgressAlertSeen();

    useEffect(() => {
        if (!enabled || alerts.length === 0) {
            return;
        }

        alerts.forEach((alert) => {
            if (displayedAlertsRef.current.has(alert.codigo)) {
                return;
            }

            displayedAlertsRef.current.add(alert.codigo);
            toast.warning("Curso parado há alguns dias", {
                id: `course-progress-alert-${alert.codigo}`,
                description: alert.mensagem,
                duration: 10000,
                closeButton: true,
                action: (
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => router.push(`/home/cursos/${alert.codigo_curso}`)}
                    >
                        Abrir curso
                    </Button>
                ),
            });
            markSeen(alert.codigo);
        });
    }, [alerts, enabled, markSeen, router]);

    return null;
}

import { cookies } from "next/headers";
import ClientPage from "./cursosid.viewmodel";

interface PageProps {
    params: Promise<{ classId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { classId } = await params;
    const cookieStore = await cookies();
    const isAuthenticated = Boolean(cookieStore.get("accessToken")?.value);

    return <ClientPage classId={Number(classId)} isAuthenticated={isAuthenticated} />;
}

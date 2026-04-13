import ClientPage from "./cursosid.viewmodel";
import { cookies } from "next/headers";

interface PageProps {
    params: Promise<{ classId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { classId } = await params;
    const cookieStore = await cookies();
    const isAuthenticated = !!cookieStore.get("accessToken")?.value;

    return <ClientPage classId={Number(classId)} isAuthenticated={isAuthenticated} />;
}

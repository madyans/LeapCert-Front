import ClientPage from "./cursosid.viewmodel";

interface PageProps {
    params: Promise<{ classId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { classId } = await params;

    return <ClientPage classId={Number(classId)} />;
}

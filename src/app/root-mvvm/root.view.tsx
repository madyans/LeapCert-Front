import { useRouter } from "next/navigation";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useRootModel } from "./root.model";

type RootViewProps = ReturnType<typeof useRootModel>

export const RootPage = (props: RootViewProps) => {
    const { filteredCourses, searchTerm, selectedCategory, setSearchTerm, setSelectedCategory } = props
    const router = useRouter()

    return (
        <div className="w-full min-h-screen flex flex-col bg-green-50">
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <Main
                filteredCourses={filteredCourses}
                router={router}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <Footer />
        </div>
    )
}
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useRootModel } from "./root.model";

type RootViewProps = ReturnType<typeof useRootModel>

export const RootPage = (props: RootViewProps) => {
    const { filteredCourses, topRatedCourses, categories, searchTerm, selectedCategory, setSearchTerm, setSelectedCategory, isLoading } = props

    return (
        <div className="w-full min-h-screen flex flex-col bg-green-50">
            <Header />

            <Main
                filteredCourses={filteredCourses}
                topRatedCourses={topRatedCourses}
                categories={categories}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isLoading={isLoading}
            />

            <Footer />
        </div>
    )
}
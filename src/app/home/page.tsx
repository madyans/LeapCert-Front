import { AreaChartComponent } from "./components/charts/area-chart";
import { Donut } from "./components/charts/donut";
import { RadialChart } from "./components/charts/radial-chart";
import { Stacked } from "./components/charts/stacked";

export default function Page() {
    return (
        <>
            <div className="text-black p-2 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Stacked />
                <Donut />
                <RadialChart />
            </div>
            <div className="p-2">
                <AreaChartComponent />
            </div>
        </>
    )
}
'use client';

import { useRootModel } from "./root-mvvm/root.model";
import { RootPage } from "./root-mvvm/root.view";

export default function Root() {
    const methods = useRootModel()

    return <RootPage {...methods} />
}
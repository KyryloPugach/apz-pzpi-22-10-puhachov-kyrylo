import { ComponentType } from "react";
import { MainPage } from "./pages/MainPage";
import { BRIDGES_ROUTE, CHART_ROUTE, INSPECTORS_ROUTE, MAIN_ROUTE, SENSOR_DATAS_ROUTE, SENSOR_TYPES_ROUTE, SENSORS_ROUTE } from "./consts";
import { Bridges } from "./pages/Bridges";
import { Inspectors } from "./pages/Inspectors";
import { Sensors } from "./pages/Sensors";
import { SensorDatas } from "./pages/SensorDatas";
import { SensorTypes } from "./pages/SensorTypes";
import { Charts } from "./pages/Charts";

interface RouteData {
    path: string,
    Component: ComponentType,
}

export const applicationRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: BRIDGES_ROUTE, Component: Bridges },
    { path: INSPECTORS_ROUTE, Component: Inspectors },
    { path: SENSORS_ROUTE, Component: Sensors },
    { path: SENSOR_DATAS_ROUTE, Component: SensorDatas },
    { path: SENSOR_TYPES_ROUTE, Component: SensorTypes },
    { path: CHART_ROUTE, Component: Charts },
]
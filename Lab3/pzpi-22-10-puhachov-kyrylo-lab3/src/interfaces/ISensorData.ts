import { ISensor } from "./ISensor";

export interface ISensorData {
    sensorDataId: number,
    date: string,
    value: string,
    sensorId: number,
    sensor: ISensor
}
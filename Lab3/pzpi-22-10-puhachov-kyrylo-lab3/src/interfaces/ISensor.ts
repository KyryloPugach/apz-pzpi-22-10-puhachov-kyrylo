import { IBridge } from "./IBridge";
import { ISensorData } from "./ISensorData";
import { ISensorType } from "./ISensorType";

export interface ISensor {
    sensorId: number,
    name: string,
    description: string,
    location: string,
    installationDate: string,
    bridgeId: number,
    bridge: IBridge,
    sensorTypeId: number,
    sensorType: ISensorType
    sensorDatas: ISensorData[]
}
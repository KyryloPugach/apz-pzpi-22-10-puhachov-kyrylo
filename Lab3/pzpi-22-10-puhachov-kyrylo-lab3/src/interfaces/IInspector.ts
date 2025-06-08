import { IBridge } from "./IBridge";

export interface IInspector {
    inspectorId: number,
    name: string,
    surname: string,
    phoneNumber: string,
    email: string,
    role: string,
    bridgeId: number,
    bridge: IBridge
}
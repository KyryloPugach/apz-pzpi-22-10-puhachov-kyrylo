import { $authhost } from ".";
import { IBridge } from "../interfaces/IBridge";

export const getBridges = async () => {
    const { data } = await $authhost.get('api/Bridges')
    return data;
}

export const createBridge = async (formData: IBridge) => {
    const { data } = await $authhost.post('api/Bridges', formData)
    return data;
}

export const editBridge = async (id: number, formData: IBridge) => {
    const { data } = await $authhost.put(`api/Bridges/${id}`, formData)
    return data;
}

export const deleteBridge = async (id: number) => {
    const { data } = await $authhost.delete(`api/Bridges/${id}`)
    return data;
}

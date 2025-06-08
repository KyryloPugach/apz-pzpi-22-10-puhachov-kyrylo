import { $authhost } from ".";
import { IInspector } from "../interfaces/IInspector";

export const getInspectors = async () => {
    const { data } = await $authhost.get('api/Inspectors')
    return data;
}

export const createInspector = async (formData: IInspector) => {
    const { data } = await $authhost.post('api/Inspectors', formData)
    return data;
}

export const editInspector = async (id: number, formData: IInspector) => {
    const { data } = await $authhost.put(`api/Inspectors/${id}`, formData)
    return data;
}

export const deleteInspector = async (id: number) => {
    const { data } = await $authhost.delete(`api/Inspectors/${id}`)
    return data;
}

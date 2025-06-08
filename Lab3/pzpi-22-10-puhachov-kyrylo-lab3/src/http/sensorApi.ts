import { $authhost } from ".";
import { ISensor } from "../interfaces/ISensor";

export const getSensors = async () => {
    const { data } = await $authhost.get('api/Sensors')
    return data;
}

export const createSensor = async (formData: ISensor) => {
    const { data } = await $authhost.post('api/Sensors', formData)
    return data;
}

export const editSensor = async (id: number, formData: ISensor) => {
    const { data } = await $authhost.put(`api/Sensors/${id}`, formData)
    return data;
}

export const deleteSensor = async (id: number) => {
    const { data } = await $authhost.delete(`api/Sensors/${id}`)
    return data;
}

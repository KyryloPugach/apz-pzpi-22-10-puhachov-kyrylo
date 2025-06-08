import { $authhost } from ".";
import { ISensorType } from "../interfaces/ISensorType";

export const getSensorTypes = async () => {
    const { data } = await $authhost.get('api/SensorTypes')
    return data;
}

export const createSensorType = async (formData: ISensorType) => {
    const { data } = await $authhost.post('api/SensorTypes', formData)
    return data;
}

export const editSensorType = async (id: number, formData: ISensorType) => {
    const { data } = await $authhost.put(`api/SensorTypes/${id}`, formData)
    return data;
}

export const deleteSensorType = async (id: number) => {
    const { data } = await $authhost.delete(`api/SensorTypes/${id}`)
    return data;
}

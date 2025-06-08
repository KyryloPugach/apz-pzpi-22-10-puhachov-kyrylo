import { $authhost } from ".";
import { ISensorData } from "../interfaces/ISensorData";

export const getSensorDatas = async () => {
    const { data } = await $authhost.get('api/SensorDatas')
    return data;
}

export const createSensorData = async (formData: ISensorData) => {
    const { data } = await $authhost.post('api/SensorDatas', formData)
    return data;
}

export const editSensorData = async (id: number, formData: ISensorData) => {
    const { data } = await $authhost.put(`api/SensorDatas/${id}`, formData)
    return data;
}

export const deleteSensorData = async (id: number) => {
    const { data } = await $authhost.delete(`api/SensorDatas/${id}`)
    return data;
}

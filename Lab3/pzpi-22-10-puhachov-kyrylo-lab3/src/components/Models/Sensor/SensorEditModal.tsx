import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { editSensor } from '../../../http/sensorApi'
import { ISelect } from '../../../interfaces/ISelect'
import { ISensor } from '../../../interfaces/ISensor'
import { getBridges } from '../../../http/bridgeApi'
import { IBridge } from '../../../interfaces/IBridge'
import { ISensorType } from '../../../interfaces/ISensorType'
import { getSensorTypes } from '../../../http/sensorTypeApi'

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ISensor,
}

export const SensorEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ISensor>();
      const [bridges, setBridges] = useState<IBridge[]>([]);
      const [sensorTypes, setSensorTypes] = useState<ISensorType[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ISensor) => {
        await editSensor(data.sensorId, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Smth went wrong!"));
      };

    const fetchBridges = async () => {
        await getBridges().then((data) => setBridges(data));
      };

      const fetchSensorTypes = async () => {
        await getSensorTypes().then((data) => setSensorTypes(data));
      };
    
      useEffect(() => {
        fetchBridges();
        fetchSensorTypes();
      }, []);
    
      const selectBridges = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...bridges.map((item) => {
            return {
              value: item.bridgeId.toString(),
              label: `Id: ${item.bridgeId}, Name: ${item?.name}`,
            };
          }),
        ];
      }, [bridges]);

      const selectSensorTypes = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...sensorTypes.map((item) => {
            return {
              value: item.sensorTypeId.toString(),
              label: `Id: ${item.sensorTypeId}, Name: ${item?.name}`,
            };
          }),
        ];
      }, [sensorTypes]);

    return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Editing</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                ></div>
               <div className="form-group">
                  <label className="control-label">Name</label>
                  <Controller
                    control={control}
                    name={"name"}
                    rules={{
                      required: "enter name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Description</label>
                  <Controller
                    control={control}
                    name={"description"}
                    rules={{
                      required: "enter description",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.description?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Location</label>
                  <Controller
                    control={control}
                    name={"location"}
                    rules={{
                      required: "enter location",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.location?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Installation date</label>
                  <Controller
                    control={control}
                    name={"installationDate"}
                    rules={{
                      required: "enter date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.installationDate?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Bridge</label>
                <Controller
                  control={control}
                  name={"bridgeId"}
                  rules={{
                    required: "enter bridge",
                    validate: (data) => (data != 0 ? undefined : "Select bridge"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectBridges.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.bridgeId?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Sensor type</label>
                <Controller
                  control={control}
                  name={"sensorTypeId"}
                  rules={{
                    required: "enter type",
                    validate: (data) => (data != 0 ? undefined : "Select type"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectSensorTypes.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.sensorTypeId?.message}</p>
              </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
      )
}

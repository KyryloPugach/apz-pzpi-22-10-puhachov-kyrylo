import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { ISensorData } from '../../../interfaces/ISensorData';
import { editSensorData } from '../../../http/sensorDataApi';
import { getSensors } from '../../../http/sensorApi';
import { ISelect } from '../../../interfaces/ISelect';
import { ISensor } from '../../../interfaces/ISensor';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ISensorData,
}

export const SensorDataEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ISensorData>();
      const [sensors, setSensors] = useState<ISensor[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ISensorData) => {
        await editSensorData(data.sensorDataId, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => console.log("Smth went wrong!"));
      };

      const fetchSensors = async () => {
        await getSensors().then((data) => setSensors(data));
      };
    
      useEffect(() => {
        fetchSensors();
      }, []);
    
      const selectSensors = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...sensors.map((item) => {
            return {
              value: item.sensorId.toString(),
              label: `Id: ${item.sensorId}, Name: ${item?.name}`,
            };
          }),
        ];
      }, [sensors]);

      return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Edtiting</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                ></div>
                <div className="form-group">
                  <label className="control-label">Date</label>
                  <Controller
                    control={control}
                    name={"date"}
                    rules={{
                      required: "enter date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.date?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Value</label>
                  <Controller
                    control={control}
                    name={"value"}
                    rules={{
                      required: "enter value",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.value?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Sensor</label>
                <Controller
                  control={control}
                  name={"sensorId"}
                  rules={{
                    required: "enter sensor",
                    validate: (data) => (data != 0 ? undefined : "Select sensor"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectSensors.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.sensorId?.message}</p>
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

import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { ISensorData } from '../../../interfaces/ISensorData';
import { createSensorData } from '../../../http/sensorDataApi';
import { getSensors } from '../../../http/sensorApi';
import { ISensor } from '../../../interfaces/ISensor';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }

export const SensorDataCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<ISensorData>();
      const [sensors, setSensors] = useState<ISensor[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: ISensorData) => {
        await createSensorData(data)
          .then(() => {
            handleClose();
            fetch();
          })
          .catch(() => alert("Some went wrong!"));
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
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Creating</Modal.Title>
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
                <Button variant="secondary" onClick={handleClose}>
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

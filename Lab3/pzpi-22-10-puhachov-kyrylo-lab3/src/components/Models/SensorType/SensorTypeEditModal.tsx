import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { ISensorType } from '../../../interfaces/ISensorType';
import { editSensorType } from '../../../http/sensorTypeApi';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ISensorType,
}

export const SensorTypeEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ISensorType>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ISensorType) => {
        await editSensorType(data.sensorTypeId, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => console.log("Smth went wrong!"));
      };

      return (
        <Modal show={show} onHide={onHide}>
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
                  <label className="control-label">Measurement value</label>
                  <Controller
                    control={control}
                    name={"measurementValue"}
                    rules={{
                      required: "enter measurementValue",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.measurementValue?.message}</p>
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

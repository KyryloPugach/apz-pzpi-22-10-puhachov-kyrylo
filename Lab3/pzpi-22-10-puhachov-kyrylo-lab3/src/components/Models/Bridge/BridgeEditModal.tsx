import React, { useEffect } from 'react'
import { IBridge } from '../../../interfaces/IBridge'
import { Controller, useForm } from 'react-hook-form';
import { editBridge } from '../../../http/bridgeApi';
import { Button, Modal } from 'react-bootstrap';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IBridge,
}

export const BridgeEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IBridge>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IBridge) => {
        await editBridge(data.bridgeId, data)
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
                <Modal.Title>Edtiting</Modal.Title>
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
                  <label className="control-label">Bridge type</label>
                  <Controller
                    control={control}
                    name={"bridgeType"}
                    rules={{
                      required: "enter bridge type",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.bridgeType?.message}</p>
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
                  <label className="control-label">Status</label>
                  <Controller
                    control={control}
                    name={"status"}
                    rules={{
                      required: "enter status",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.status?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Creation date</label>
                  <Controller
                    control={control}
                    name={"creationDate"}
                    rules={{
                      required: "enter date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.creationDate?.message}</p>
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

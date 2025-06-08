import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IBridge } from '../../../interfaces/IBridge';
import { createBridge } from '../../../http/bridgeApi';
import { Button, Modal } from 'react-bootstrap';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }

export const BridgeCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IBridge>();
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IBridge) => {
        await createBridge(data)
          .then(() => {
            handleClose();
            fetch();
          })
          .catch(() => alert("Some went wrong!"));
      };
          
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

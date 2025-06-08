import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IBridge } from '../../../interfaces/IBridge';
import { createBridge, getBridges } from '../../../http/bridgeApi';
import { Button, Modal } from 'react-bootstrap';
import { IInspector } from '../../../interfaces/IInspector';
import { createInspector } from '../../../http/inspectorApi';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }

export const InspectorCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IInspector>();
      const [bridges, setBridges] = useState<IBridge[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IInspector) => {
        await createInspector(data)
          .then(() => {
            handleClose();
            fetch();
          })
          .catch(() => alert("Some went wrong!"));
      };
          
      const fetchBridges = async () => {
        await getBridges().then((data) => setBridges(data));
      };
    
      useEffect(() => {
        fetchBridges();
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

      return (
        <Modal show={show} onHide={handleClose}>
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
                  <label className="control-label">Surname</label>
                  <Controller
                    control={control}
                    name={"surname"}
                    rules={{
                      required: "enter surname",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.surname?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Phone number</label>
                  <Controller
                    control={control}
                    name={"phoneNumber"}
                    rules={{
                      required: "enter phone",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.phoneNumber?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Email</label>
                  <Controller
                    control={control}
                    name={"email"}
                    rules={{
                      required: "enter email",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Role</label>
                  <Controller
                    control={control}
                    name={"role"}
                    rules={{
                      required: "enter role",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.role?.message}</p>
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

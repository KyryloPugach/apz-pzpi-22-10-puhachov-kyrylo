import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ISensor } from '../interfaces/ISensor';
import { deleteSensor, getSensors } from '../http/sensorApi';
import { SensorCreateModal } from '../components/Models/Sensor/SensorCreateModal';
import { SensorEditModal } from '../components/Models/Sensor/SensorEditModal';

export const Sensors = () => {
    const [items, setItems] = useState<ISensor[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ISensor>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ISensor) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getSensors()
        .then((data) => {
            setItems(data);
        })
        .catch(() => console.log("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteSensor(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <SensorCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></SensorCreateModal>
  
        <SensorEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></SensorEditModal>
        <h1>Index</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Installation date</th>
              <th>Bridge</th>
              <th>Sensor type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sensorId}>
                <td>{item.sensorId}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.location}</td>
                <td>{item.installationDate}</td>
                <td>{item.bridge?.name}</td>
                <td>{item.sensorType?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(item)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(item.sensorId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

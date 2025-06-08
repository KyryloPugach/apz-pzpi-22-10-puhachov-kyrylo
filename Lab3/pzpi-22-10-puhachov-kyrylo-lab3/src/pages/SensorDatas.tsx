import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ISensorData } from '../interfaces/ISensorData';
import { deleteSensorData, getSensorDatas } from '../http/sensorDataApi';
import { SensorDataCreateModal } from '../components/Models/SensorData/SensorDataCreateModal';
import { SensorDataEditModal } from '../components/Models/SensorData/SensorDataEditModal';

export const SensorDatas = () => {
    const [items, setItems] = useState<ISensorData[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ISensorData>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ISensorData) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getSensorDatas()
        .then((data) => {
            setItems(data);
        })
        .catch(() => console.log("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteSensorData(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <SensorDataCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></SensorDataCreateModal>
  
        <SensorDataEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></SensorDataEditModal>
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
              <th>Date</th>
              <th>Value</th>
              <th>Sensor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sensorDataId}>
                <td>{item.sensorDataId}</td>
                <td>{item.date}</td>
                <td>{item.value}</td>
                <td>{item.sensor?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(item)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(item.sensorDataId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

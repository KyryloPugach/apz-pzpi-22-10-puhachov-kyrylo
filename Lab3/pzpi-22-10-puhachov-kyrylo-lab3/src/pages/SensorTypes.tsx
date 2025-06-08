import React, { useEffect, useState } from 'react'
import { IBridge } from '../interfaces/IBridge';
import { deleteBridge, getBridges } from '../http/bridgeApi';
import { Button } from 'react-bootstrap';
import { BridgeCreateModal } from '../components/Models/Bridge/BridgeCreateModal';
import { BridgeEditModal } from '../components/Models/Bridge/BridgeEditModal';
import { ISensorType } from '../interfaces/ISensorType';
import { SensorTypeCreateModal } from '../components/Models/SensorType/SensorTypeCreateModal';
import { SensorTypeEditModal } from '../components/Models/SensorType/SensorTypeEditModal';
import { deleteSensorType, getSensorTypes } from '../http/sensorTypeApi';

export const SensorTypes = () => {
    const [items, setItems] = useState<ISensorType[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ISensorType>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ISensorType) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getSensorTypes  ()
        .then((data) => {
            setItems(data);
        })
        .catch(() => console.log("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteSensorType(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <SensorTypeCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></SensorTypeCreateModal>
  
        <SensorTypeEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></SensorTypeEditModal>
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
              <th>Measurement value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sensorTypeId}>
                <td>{item.sensorTypeId}</td>
                <td>{item.name}</td>
                <td>{item.measurementValue}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(item)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(item.sensorTypeId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

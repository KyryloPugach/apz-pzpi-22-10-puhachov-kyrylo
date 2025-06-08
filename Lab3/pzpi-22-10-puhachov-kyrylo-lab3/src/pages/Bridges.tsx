import React, { useEffect, useState } from 'react'
import { IBridge } from '../interfaces/IBridge';
import { deleteBridge, getBridges } from '../http/bridgeApi';
import { Button } from 'react-bootstrap';
import { BridgeCreateModal } from '../components/Models/Bridge/BridgeCreateModal';
import { BridgeEditModal } from '../components/Models/Bridge/BridgeEditModal';

export const Bridges = () => {
    const [items, setItems] = useState<IBridge[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IBridge>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IBridge) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getBridges()
        .then((data) => {
            setItems(data);
        })
        .catch(() => console.log("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteBridge(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <BridgeCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></BridgeCreateModal>
  
        <BridgeEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></BridgeEditModal>
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
              <th>Bridge type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Creation date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.bridgeId}>
                <td>{item.bridgeId}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.bridgeType}</td>
                <td>{item.location}</td>
                <td>{item.status}</td>
                <td>{item.creationDate}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(item)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(item.bridgeId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

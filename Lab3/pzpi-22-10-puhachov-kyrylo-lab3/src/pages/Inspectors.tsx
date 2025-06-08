import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { IInspector } from '../interfaces/IInspector';
import { deleteInspector, getInspectors } from '../http/inspectorApi';
import { InspectorEditModal } from '../components/Models/Inspector/InspectorEditModal';
import { InspectorCreateModal } from '../components/Models/Inspector/InspectorCreateModal';

export const Inspectors = () => {
    const [items, setItems] = useState<IInspector[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IInspector>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IInspector) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getInspectors()
        .then((data) => {
            setItems(data);
        })
        .catch(() => console.log("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteInspector(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <InspectorCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></InspectorCreateModal>
  
        <InspectorEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></InspectorEditModal>
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
              <th>Surname</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Bridge name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.inspectorId}>
                <td>{item.inspectorId}</td>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.bridge?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(item)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(item.inspectorId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

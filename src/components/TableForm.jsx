import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const TableForm = () => {
    const { handleSubmit, setValue, register, reset } = useForm();
    const [data, setData] = useState([]);
    const [editItemId, setEditItemId] = useState(null);

    const onSubmit = (formData) => {
        if (editItemId) {
            handleEditSubmit(formData);  //formData = data of form
        } else {
            const newData = { id: uuidv4(), ...formData };
            setData((prevData) => [...prevData, newData]);
            reset(); // Clear the form fields after submission
        }
    };

    const handleDelete = (id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const handleEdit = (id) => {
        setEditItemId(id);
        const editItem = data.find((item) => item.id === id);
        if (editItem) {
            Object.entries(editItem).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    };

    const handleEditSubmit = (formData) => {
        const updatedData = data.map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
        );
        setData(updatedData);
        reset(); // Clear the form fields after edit submission
        setEditItemId(null); // Reset editItemId after submission
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: '20px 10px' }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button onClick={() => handleEdit(item.id)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                data.length == 0 && <div style={{padding: "10px"}}>There have no data added yet.</div>
            }
            <div style={{ marginTop: "10px" }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ border: '1px solid blue', padding: "20px", display: "flex" }}>
                    <div>
                        <label>Username</label>
                        <input {...register('username')} style={{ padding: "5px", marginLeft: "5px" }} />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input {...register('phone')} style={{ padding: "5px" }} />
                    </div>

                    <div>
                        <label>Email</label>
                        <input {...register('email')} style={{ padding: "5px" }} />
                    </div>

                    <div>
                        <label>Price</label>
                        <input {...register('price')} style={{ padding: "5px" }} />
                    </div>

                    <div>
                        <label>Quantity</label>
                        <input {...register('quantity')} style={{ padding: "5px" }} />
                    </div>

                    <button type="submit">{editItemId ? 'Update' : 'Submit'}</button>
                </form>
            </div>
        </div>
    );
};

export default TableForm;

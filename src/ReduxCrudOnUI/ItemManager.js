
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem, deleteItem } from './itemsSlice';

const ItemManager = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (inputValue.trim() === '') return;
    dispatch(addItem({ id: Date.now(), text: inputValue }));
    setInputValue('');
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setInputValue(item.text);
  };

  const handleUpdateItem = () => {
    if (inputValue.trim() === '') return;
    dispatch(updateItem({ id: selectedItem.id, text: inputValue }));
    setInputValue('');
    setSelectedItem(null);
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <h1>Item Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {selectedItem ? (
          <button onClick={handleUpdateItem}>Update</button>
        ) : (
          <button onClick={handleAddItem}>Add</button>
        )}
      </div >
      <center>
      <table cellPadding={5}>
      <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.text}</td>
            <td><button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button></td>
          </tr>
        ))}
      </table>
      </center>
    </div>
  );
};

export default ItemManager;

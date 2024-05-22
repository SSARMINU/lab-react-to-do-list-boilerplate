import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: '',
      editItem: null,
      editText: ''
    };
  }

  addItem = () => {
    const { newItem, items } = this.state;
    if (newItem.trim() === '') return;
    this.setState({
      items: [...items, { id: Date.now(), text: newItem }],
      newItem: ''
    });
  };

  deleteItem = (id) => {
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    });
  };

  startEditing = (item) => {
    this.setState({
      editItem: item,
      editText: item.text
    });
  };

  cancelEditing = () => {
    this.setState({
      editItem: null,
      editText: ''
    });
  };

  saveEdit = () => {
    const { editText, editItem, items } = this.state;
    if (editText.trim() === '') return;
    this.setState({
      items: items.map(item => (item.id === editItem.id ? { ...item, text: editText } : item)),
      editItem: null,
      editText: ''
    });
  };

  handleInputChange = (event) => {
    this.setState({ newItem: event.target.value });
  };

  handleEditChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  render() {
    const { items, newItem, editItem, editText } = this.state;
    return (
      <div className="App">
        <h1>To-Do List</h1>
        <input
          type="text"
          value={newItem}
          onChange={this.handleInputChange}
          placeholder="Add a new item"
        />
        <button onClick={this.addItem}>Add</button>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {editItem && editItem.id === item.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={this.handleEditChange}
                  />
                  <button onClick={this.saveEdit}>Save</button>
                  <button onClick={this.cancelEditing}>Cancel</button>
                </>
              ) : (
                <>
                  {item.text}
                  <button onClick={() => this.startEditing(item)}>Edit</button>
                  <button onClick={() => this.deleteItem(item.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

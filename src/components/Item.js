import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            editMode: false,
        }

        this.changeModeToEdit = this.changeModeToEdit.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeModeToEdit() {
        this.setState((state) => ({
            editMode: true,
        }));
    }

    handleChange(event) {
        this.setState({
            task: event.target.value,
        })
    }

    editTask(event) {
        let task = this.state.task.trim();
        console.log(event.keyCode, task);
        if (event.keyCode == 13) {
            this.setState({
                task: task,
                editMode: false,
            })
            if (task !== "") {
                this.props.editItem(this.props.id, task);
            } else {
                this.props.deleteItem(this.props.id);
            }
        }

    }

    render() {
        const id = this.props.id;
        let toDo;
        const editInput = <li> <input value={this.state.task} onChange={this.handleChange} onKeyUp={this.editTask} autoFocus /></li>;
        const toDoTask = <li onDoubleClick={this.changeModeToEdit}> {this.state.task} </li>

        toDo = this.state.editMode ? editInput : toDoTask;

        return (
            <ul className="">
                <li> <input type='checkbox' checked={this.props.checked} onChange={(event) => { this.props.handleCheckBox(id, event.target.checked) }} /> </li>
                {toDo}
                <li className="delete-icon" onClick={() => { this.props.deleteItem(id) }}> X </li>
            </ul>
        );
    }
}

export default Item;
import React from 'react';
import Item from './Item';

const ALL = 0;
const ACTIVE = 1;
const COMPLETED = 2;

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            list: [],
            filter: ALL,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.clearList = this.clearList.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }

    handleInputChange(event) {
        let input = event.target.value.trim();
        this.setState({
            input: input,
        })
    }

    handleSubmit(event) {
        if (event.keyCode == 13) {
            let currentList = this.state.list;
            let task = this.state.input;
            if (task !== "") {
                console.log(task);
                currentList.push({
                    task: task,
                    status: ACTIVE,
                    id: currentList.length,
                })

                this.setState({
                    list: currentList,
                    input: '',
                });
            }
        }

    }

    changeFilter(filterCode) {
        console.log(filterCode);
        this.setState({
            filter: filterCode,
        });
    }

    getIndexFromList(id) {
        return this.state.list.findIndex(toDo => toDo.id === id);
    }

    handleCheckBox(id, value) {
        let index = this.getIndexFromList(id);
        let currentList = this.state.list;
        currentList[index].status = value ? COMPLETED : ACTIVE;
        this.setState({
            list: currentList,
        });

    }

    editItem(id, value) {
        let index = this.getIndexFromList(id);
        let currentList = this.state.list;
        currentList[index].task = value;
        console.log('edited', id, value);
        this.setState({
            list: currentList,
        });

    }

    deleteItem(id) {
        let index = this.getIndexFromList(id);
        let currentList = this.state.list;
        currentList.splice(index, 1);
        this.setState({
            list: currentList,
        });

    }

    clearList() {
        this.setState({
            list: [],
        })
        localStorage.clear();

    }

    componentDidMount(){
        let list = JSON.parse(localStorage.getItem('list'));
        let filter = Number(localStorage.getItem('filter'));
        list = list == null ? [] : list;
        filter = isNaN(filter) ? ALL : filter;

        this.setState({
            list: list,
            filter: filter
        });
    }

    componentDidUpdate(){
        let list = this.state.list;
        let filter = this.state.filter;
        localStorage.setItem('list', JSON.stringify(list));
        localStorage.setItem('filter', filter);

    }

    render() {

        const toDosLeft = this.state.list.filter(toDo => toDo.status === ACTIVE).length;
        const toDoList = this.state.list.filter(toDo => (this.state.filter === ALL || this.state.filter === toDo.status));

        const toDoItems = toDoList.map(toDo => {
            let checked = toDo.status === ACTIVE ? false : true;
            console.log(toDo);
            return <Item key={toDo.id} id={toDo.id} task={toDo.task} checked={checked} deleteItem={this.deleteItem} handleCheckBox={this.handleCheckBox} editItem={this.editItem} />
        });

        return (
            <div className='wrapper'>
                <div className='container display-inline-block '>
                    <div className="add-to-do">
                        <input id='to-do-input' value={this.state.input} onChange={this.handleInputChange} onKeyUp={this.handleSubmit} placeholder="press enter to add" />
                    </div>
                    <div className="button-container margin-left-default">
                        <button id='all' className='filter-button' onClick={() => { this.changeFilter(ALL); }} > All </button>
                        <button id='active' className='filter-button' onClick={() => { this.changeFilter(ACTIVE); }} > Active </button>
                        <button id='completed' className='filter-button' onClick={() => { this.changeFilter(COMPLETED); }} > Completed </button>
                    </div>

                    <ul className="to-do-list  margin-left-default">{toDoItems} </ul>

                    <ul className="margin-left-default"> <li id="to-dos-left"> {toDosLeft} remaining </li> </ul >
                    <ul className="margin-left-default"><button id='clear-button' className="filter-button clear-color" onClick={this.clearList} >Clear</button></ul>

                </div>
            </div>
        );
    }
}

export default ToDo;
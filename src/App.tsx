import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterButtonName = "All" | "Active" | "Completed"

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])

    // const [filterButtonName, setFilterButtonName] = useState<FilterButtonName>("All")
    //
    // let durshlag = tasks
    //
    // if(filterButtonName === "Active")   durshlag = tasks.filter(el=>!el.isDone)
    // if(filterButtonName === "Completed")  durshlag = tasks.filter(el=>el.isDone)
    //
    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }
    //
    // const filteredCurrentTasks = (buttonName:FilterButtonName) => {
    //     setFilterButtonName(buttonName)
    // }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    )
}

export default App;

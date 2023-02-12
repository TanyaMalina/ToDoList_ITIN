import React, {useState} from "react";
import {FilterButtonName} from "./App";

type PropsType = {
    title?: string
    tasks: TaskType[]//Array<TaskType>
    removeTask: (taskID:number) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [filterButtonName, setFilterButtonName] = useState<FilterButtonName>("All")

    let durshlag = props.tasks

    if(filterButtonName === "Active") durshlag = props.tasks.filter(el=>!el.isDone)
    if(filterButtonName === "Completed") durshlag = props.tasks.filter(el=>el.isDone)

    const filteredCurrentTasks = (buttonName:FilterButtonName) => {
        setFilterButtonName(buttonName)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                {durshlag.map((el, index) => {
                    return (
                        <li key={index}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)}>X
                            </button>
                        </li>
                    )
                })}
            </ul>

            <div>
                <button onClick={() => filteredCurrentTasks('All')}>All</button>
                <button onClick={() => filteredCurrentTasks('Active')}>Active</button>
                <button onClick={() => filteredCurrentTasks('Completed')}>Completed</button>
            </div>
        </div>
    )
}
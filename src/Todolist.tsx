import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
//import Checkbox from '@mui/material/Checkbox';
import ButtonAppBar from "./ButtonAppBar";
import {CheckBox} from "./components/CheckBox";
import {changeTodolistTitleAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType, TodolistType} from "./AppWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskID: string, newTitle: string) => void
    updateTodoList: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        props.updateTask(props.id, taskID, newTitle)
    }

    const updateTodoLitHandler = (newTitle: string) => {
        props. updateTodoList(props.id, newTitle)
    }

    const changeStatusHandler = (taskID:string, isDone:boolean)=>{
        props.changeTaskStatus(taskID, isDone, props.id)

    }

    let task = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
        }

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <CheckBox isDone={t.isDone} callBack={(isDone: boolean) => changeStatusHandler(t.id, isDone)}/>
            <EditableSpan oldTitle={t.title} callBack={(newTitle) => updateTaskHandler(t.id, newTitle)}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    })


    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={(newTitle) => updateTodoLitHandler(newTitle)}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon />
            </IconButton>
            {/*<button onClick={removeTodolist}>x</button>*/}
        </h3>

        <AddItemForm callBack={addTaskHandler}/>

        <ul>
            {task}
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success"  onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="error" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="secondary" onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}



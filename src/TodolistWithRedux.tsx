import React, {ChangeEvent, useState, KeyboardEvent, useCallback, memo} from 'react';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
//import Checkbox from '@mui/material/Checkbox';
import ButtonAppBar from "./ButtonAppBar";
import {CheckBox} from "./components/CheckBox";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const TodolistWithRedux = memo(({todolist}: PropsType) => {

    const {id, filter, title} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeFilterAC(id, "all"))
    const onActiveClickHandler = () => dispatch(changeFilterAC(id, "active"))
    const onCompletedClickHandler = () => dispatch(changeFilterAC(id, "completed"))

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch])

    const updateTodoLitHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])

    const updateTaskHandler = useCallback((taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, id))
    }, [dispatch])

    const changeStatusHandler = (taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskID, isDone, id))
    }

    const removeTask = (taskID: string) => {
        dispatch(removeTaskAC(taskID, id))
    }

    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true)
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={title} callBack={updateTodoLitHandler}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>

        <AddItemForm callBack={addTaskHandler}/>

        <ul>
            {tasks.map(t => {
                // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                //     let newIsDoneValue = e.currentTarget.checked;
                //     dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id))
                // }
                return <Task
                    key={t.id}
                    task={t}
                    changeTaskStatus={changeStatusHandler}
                    changeTaskTitle={updateTaskHandler}
                    removeTask={removeTask}
                />
            })}
        </ul>

        <div>
            <Button variant={filter === 'all' ? "outlined" : "contained"} color="success"
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={filter === 'active' ? "outlined" : "contained"} color="error"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={filter === 'completed' ? "outlined" : "contained"} color="secondary"
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
})



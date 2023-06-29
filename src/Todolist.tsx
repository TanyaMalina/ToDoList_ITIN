import React, {ChangeEvent, useState, KeyboardEvent, useCallback, memo, useMemo} from 'react';
import {AddItemForm} from "./AddItemForm";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
//import Checkbox from '@mui/material/Checkbox';
import ButtonAppBar from "./ButtonAppBar";
import {CheckBox} from "./components/CheckBox";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const Todolist = memo(({todolist}: PropsType) => {

    const {id, filter, title} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC(id, "all")), [dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC(id, "active")), [dispatch])
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC(id, "completed")), [dispatch])

    const removeTodolist = () => dispatch(removeTodolistAC(id))

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch])

    const updateTodoLitHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])


    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true)
    }

    return <div>
        <h3>
            <EditableSpan value={title} onChange={updateTodoLitHandler}/>
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
                    todolistID={id}
                />
            })}
        </ul>

        <div style={{paddingTop: "10px"}}>
            <ButtonWithMemo
                title={'All'}
                onClick={onAllClickHandler}
                variant={filter === 'all' ? "outlined" : "contained"}
                color={"success"}/>

            <ButtonWithMemo
                title={'Active'}
                onClick={onActiveClickHandler}
                variant={filter === 'active' ? "outlined" : "contained"}
                color={"error"}/>

            <ButtonWithMemo
                title={'Completed'}
                onClick={onCompletedClickHandler}
                variant={filter === 'completed' ? "outlined" : "contained"}
                color={"secondary"}/>
        </div>
    </div>
})

type ButtonWithMemoPropsType = {
    title: string
    onClick: () => void
    variant: "text" | "outlined" | "contained"
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'

}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return <Button
        variant={props.variant}
        color={props.color}
        onClick={props.onClick}>
        {props.title}</Button>
})


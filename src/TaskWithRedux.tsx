import React, {ChangeEvent, memo, useCallback} from 'react';
import {CheckBox} from "./components/CheckBox";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodolistWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskPropsType = {
    task: TaskType
    todolistID: string
}

export const TaskWithRedux = memo(({task, todolistID}: TaskPropsType) => {

    const dispatch = useDispatch()

    const changeStatusHandler = useCallback( (isDone:boolean) => {
        dispatch(changeTaskStatusAC(task.id, isDone, todolistID))
    }, [dispatch, task.id, todolistID])

    const updateTaskHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistID))
    }, [dispatch, task.id, todolistID])

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistID))

    return (
        <li className={task.isDone ? "is-done" : ""}>
            <CheckBox isDone={task.isDone}
                      callBack={changeStatusHandler}/>
            <EditableSpan oldTitle={task.title}
                          callBack={updateTaskHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})

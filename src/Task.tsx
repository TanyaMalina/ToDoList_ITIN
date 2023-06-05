import React, {ChangeEvent, memo, useCallback} from 'react';
import {CheckBox} from "./components/CheckBox";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodolistWithRedux";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task = memo((props: TaskPropsType) => {

    const changeStatusHandler = () => props.changeTaskStatus(props.task.id, !props.task.isDone)

    const updateTaskHandler = useCallback((taskID: string, newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle)
    }, [props.changeTaskTitle, props.task.id])

    const onClickHandler = () => props.removeTask(props.task.id)

    return (
        <li className={props.task.isDone ? "is-done" : ""}>
            <CheckBox isDone={props.task.isDone}
                      callBack={changeStatusHandler}/>
            <EditableSpan oldTitle={props.task.title}
                          callBack={(newTitle) => updateTaskHandler(props.task.id, newTitle)}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})

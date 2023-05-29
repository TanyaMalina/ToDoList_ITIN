import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    ActionsType, addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, ActionsType>>(TodolistsReducer,
        [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
        ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    })

    const updateTask = (todolistId: string, taskID: string, newTitle: string) => {
        const action = changeTaskTitleAC(taskID, newTitle, todolistId)
        dispatchToTasks(action)
    }

    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasks(action)
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchToTasks(action)
    }

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchToTasks(action)
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeFilterAC(todolistId, value)
        dispatchToTodolists(action)
    }

    const removeTodolist = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTodoList = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTodoList = (todolistId: string, newTitle: string) => {
        const action =  changeTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolists(action)
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                            }

                            return <Grid item>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodoList={updateTodoList}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducers;

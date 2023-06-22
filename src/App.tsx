import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodoList = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    },[dispatch])

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
                            return <Grid key={tl.id} item>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <Todolist
                                        todolist={tl}
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

export default App;

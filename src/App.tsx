import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodoList = (newTitle: string) => {
        const newID = v1()
        const newTodo: TodolistType = {id: newID, title: newTitle, filter: "all"}
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newID]: []})
    }

    const updateTodoList = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodoList}/>
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

                    return <Todolist
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
                })
            }

        </div>
    );
}

export default App;

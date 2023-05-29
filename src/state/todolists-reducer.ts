import {FilterValuesType, TodolistType} from "../App"
import {v1} from "uuid";

export type ActionsType = RemoveTodolistACType | AddTodoListACType | ChangeTodolistTitleACType | ChangeFilterACType

const initialState: Array<TodolistType> = []

export const TodolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistType = {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: "all"}
            return [...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.newTodolistTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.newFilter} : el)
        }
        default:
            return state
    }
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export type AddTodoListACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle,
            todolistId: v1()
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, newTodolistTitle
        }
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, newFilter
        }
    } as const
}





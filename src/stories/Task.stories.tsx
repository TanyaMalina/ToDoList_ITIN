import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Todolist";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskWrap = ()=>{
    const todolistID = 'todolistId1'
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID][0])
    console.log(task)

    return <Task task={task} todolistID={todolistID}/>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    render: () => <TaskWrap/>
};


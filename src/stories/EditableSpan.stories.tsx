import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args:{
        value:'dskfjksdfkjs'
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

const OnChangeTitle: FC<EditableSpanPropsType> = (args) => {

    let [editMode, setEditMode] = useState(true);
    let [title, setTitle] = useState(args.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(args.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        args.onChange(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{args.value}</span>
};

export const OnChangeTitleStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    render: (args) => <OnChangeTitle onChange={args.onChange} value={args.value}/>
};
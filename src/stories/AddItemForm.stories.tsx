import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callBack: {
            description: 'Button clicked inside form',
            //action: 'clicked'
        },
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        callBack: action('Button clicked inside form')
    },
};

export const AddItemFormErrorStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    render: (args) => {
        let [title, setTitle] = useState("")
        let [error, setError] = useState<string | null>("Title is required")

        const addTask = () => {
            let newTitle = title.trim();
            if (newTitle !== "") {
                args.callBack(newTitle);
                setTitle("");
            } else {
                setError("Title is required");
            }
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error) setError(null)
            if (e.charCode === 13) {
                addTask()
            }
        }

        const buttonSettings = {
            maxWidth: '38px',
            maxHeight: '38px',
            minWidth: '38px',
            minHeight: '38px',
            backgroundColor: "blue",
            color: "white"
        }

        return (<div>
                <TextField
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    id="outlined-basic"
                    label={error ? "Title is required" : "Please type out..."}
                    variant="outlined"
                    size="small"
                    error={!!error}
                />

                <Button onClick={addTask} size="small" style={buttonSettings}>+</Button>
            </div>
        )
    }
};

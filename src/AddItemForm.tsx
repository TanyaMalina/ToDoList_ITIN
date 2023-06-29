import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from '@mui/material/TextField';
import {AddBox} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = memo((props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
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

            <IconButton onClick={addTask} color='primary'>
                <AddBox/>
            </IconButton>
        </div>
    )
})
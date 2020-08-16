import React, { useState } from 'react';
import './Todo.css';
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Modal,
    makeStyles,
    Input,
} from '@material-ui/core';
import { Gradient } from 'react-gradient';
import db from '../firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid',
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderColor: 'white'
    }
}));

function Todo(props) {

    const gradients =
        [
            ['#F50057', '#FF4B2B'],
            ['#e53935', '#e35d5b'],
        ];

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true });
        setOpen(false);
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                className="modal_container"
            >
                <div className={classes.paper}>
                    <div style={{ marginLeft: 90 }}>
                        <Gradient
                            gradients={gradients}
                            property="text"
                            element="h3"
                            angle="30deg"
                            className="h3_edit"
                        >Edit</Gradient>
                        <Input style={{ padding: 10 }} color='secondary' placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                        <br />
                        <Button style={{ marginTop: 10 }} onClick={updateTodo} variant="contained" color="secondary">Update Todo</Button>
                    </div>
                </div>
            </Modal>
            <List className="todo__list" style={{ marginBottom: 10 }}>
                <ListItem>
                    <ListItemText primary="Todo" secondary={props.todo.todo} />
                    <EditIcon
                        onClick={event => setOpen(true)} className="edit_icon" />
                    <DeleteForeverIcon
                        onClick={event => { db.collection('todos').doc(props.todo.id).delete() }} className="delete_icon" />
                </ListItem>
            </List>
        </div>
    )
}

export default Todo;
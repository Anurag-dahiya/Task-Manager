// importing  files
import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore"
import { useContext, useEffect, useState, useRef } from "react"
import { db } from "../firebase"
import { TodoContext } from "../TodoContext" 


//component for adding task in DB
const TodoForm = () => {
    const inputAreaRef = useRef();

    // show alert 
    const {showAlert, todo, setTodo} = useContext(TodoContext)
    const onSubmit = async()=>{
        if(todo?.hasOwnProperty('timestamp')){
            //update the todo
            const docRef =doc(db,"todos",todo.id);
            const todoUpdated = {...todo,timestamp: serverTimestamp()}
            updateDoc(docRef,todoUpdated)
            setTodo({ title:'',detail:''});
            showAlert('info','Todo is updated successfully')

        } else{
            const collectionRef = collection(db,"todos")
            const docRef = await addDoc(collectionRef,{...todo,timestamp:
                serverTimestamp()})
                setTodo({title:'',detail:''})
                showAlert('success','todo added successfully')
            
        }
   
    }
    useEffect(()=>{
        const CheckIfClickOutside = e =>{
            if(!inputAreaRef.current.contains(e.target)){
                console.log('Outside input area');
                setTodo({title: '',detail:''})

            } else{
                console.log('Inside input area');
            }
        }
        document.addEventListener("mousedown",CheckIfClickOutside)
        return()=>{
            document.removeEventListener("mousedown",CheckIfClickOutside)
        }
    },[])
    

    return(
        <div ref={inputAreaRef}>
            <TextField fullWidth label="Title" 
            margin="normal" 
            value={todo.title}
            variant="filled"
            onChange={e => setTodo({...todo,title:e.target.value})}/>
            
            <TextField fullWidth label="Details" multiline maxRows={4}
            value={todo.detail}
            variant="filled"
            onChange={e => setTodo({...todo,detail:e.target.value})}/>
            <Button  onClick={onSubmit} variant="contained" sx={{mt:3}}>
                {todo.hasOwnProperty('timestamp')? 'update todo':'Add a new todo'} 
            </Button>
        </div>
    )
}
export default TodoForm
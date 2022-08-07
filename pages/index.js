// importing files
import { Alert, Snackbar } from '@mui/material';
import { Container } from '@mui/system'
import { useState } from 'react';
import { TodoContext } from './TodoContext';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Header from './components/Header';

// rendering of all files
export default function Home() {
  const[open, setOpen] = useState(false);
  const [alertType, setAlertType]=useState("success")
  const[alertMessage,setAlertMessage] = useState("");
  const [todo, setTodo] = useState({title:'',detail:''})
  const showAlert = (type,msg)=>{
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  }
  const handleClose = (event,reason)=>{
    if(reason === 'clickaway'){
      return;
    }
    setOpen(false);
  }
  return (
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
      <Header/>
      <Container maxWidth="sm">
        <TodoForm/>
        <Snackbar 
        open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertType} sx={{width: '100%'
          }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList/>
      </Container>
    </TodoContext.Provider>
  )
}


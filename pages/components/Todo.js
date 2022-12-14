import { IconButton, ListItem, ListItemText } from "@mui/material"
import moment from "moment"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { TodoContext } from "../TodoContext";

const Todo = ({ id, timestamp, title, detail}) => {
    const{showAlert, setTodo} = useContext(TodoContext)
    const deleteTodo = async(id,e)=>{
        e.stopPropagation();
        const docRef=doc(db,"todos",id);
        await deleteDoc(docRef)
        showAlert('error','todo is deleted successfully');
    }
    return(
        <ListItem onClick={()=>setTodo({id,title,detail,timestamp})}
        sx={{ mt: 5, boxShadow: 5}}
        style={{backgroundColor:'#FAFAFA'}}
        secondaryAction={
            <>
            <IconButton onClick={e=>deleteTodo(id,e)}>
                <DeleteIcon/>
            </IconButton>
            </>
        }
        >
            <ListItemText
            primary={title}
            secondary={moment(timestamp).format("MMMM Do, YYYY")}/>

        </ListItem>
    )
}
export default Todo
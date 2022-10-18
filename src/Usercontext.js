import {createContext,useState} from "react";

const Usercontext=createContext();
export const UserProvider=({children})=>{
     const [data, setdata] = useState([])
     const [Movies, setMovies] = useState([]);
     const[edit,setedit]=useState({})
     const[subedit,setsubedit]=useState(false)
 return(
    <Usercontext.Provider value={{data,setdata,Movies, setMovies,edit,setedit,subedit,setsubedit}}>
        {children}
    </Usercontext.Provider>
 )
}
export default Usercontext;
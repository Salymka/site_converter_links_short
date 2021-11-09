import {createContext} from "react";

function _() {}


export  const authContext = createContext({
    token : null,
    userId : null,
    login : _,
    logout : _,
    authenticated : false

})
import React from "react";
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {authContext} from "./context/authContext";
import {useAuth} from "./hooks/auth.hook";
import {Navbar} from "./components/navbar";

function App() {
    const {token, userId, login, logout} = useAuth()
    const authenticated = !!token
    const routes = useRoutes(authenticated)
    return (
        <authContext.Provider value={{token, userId, login, logout, authenticated}}>
            <BrowserRouter>
                {authenticated && <Navbar/>}
                <div>
                    {routes}
                </div>
            </BrowserRouter>
        </authContext.Provider>

    )
}

export default App
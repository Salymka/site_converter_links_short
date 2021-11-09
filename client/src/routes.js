import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Links} from './pages/Links'
import {FinishLink} from "./pages/FinishLink";
import {CreateLink} from "./pages/CreateLink";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = (isAunteficated) => {
    if (isAunteficated) {
        return (
            <Switch>
                <Route path='/links' exact>
                    <Links/>
                </Route>
                <Route path='/create' exact>
                    <CreateLink/>
                </Route>
                <Route path='/finish_link:id'>
                    <FinishLink/>
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/">
                    <AuthPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }
}
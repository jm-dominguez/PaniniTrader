import React from "react";
import {Switch, Route} from "react-router-dom";
import UserMenu from "../ui/user/UserMenu.jsx";
import MyStickers from "../ui/user/MyStickers/MyStickers.jsx";
import Groups from "../ui/user/Groups/Groups.jsx";

export const Menu = () =>(
    <Switch>
        <Route exact path="/menu" component={UserMenu} />
        <Route path="/menu/myrepeated" component={MyStickers} />
        <Route path="/menu/groups" component={Groups} />
    </Switch>
);
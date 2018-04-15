import React from "react";
import {Switch, Route} from "react-router-dom";
import UserMenu from "../ui/user/UserMenu.jsx";
import MyStickers from "../ui/user/MyStickers/MyStickers.jsx";
import Groups from "../ui/user/Groups/Groups.jsx";
import  GroupDetail from "../ui/user/Components/GroupDetail.jsx";
import NewGroup from "../ui/user/Components/NewGroup.jsx";
import JoinGroup from "../ui/user/Components/JoinGroup.jsx";

export const Menu = () =>(
    <Switch>
        <Route exact path="/menu" component={UserMenu} />
        <Route path="/menu/myrepeated" component={MyStickers} />
        <Route path="/menu/groups" component={Groups} />
        <Route path="/menu/groupDetail" component={GroupDetail} />
        <Route path="/menu/NewGroup" component={NewGroup} />
        <Route path="/menu/JoinGroup" component={JoinGroup} />
    </Switch>
);
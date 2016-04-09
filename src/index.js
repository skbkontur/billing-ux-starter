import React from "react";
import ReactDOM from "react-dom";

import { Router } from "react-router";
import { useRouterHistory } from "react-router";
import createHashHistory from "history/lib/createHashHistory";

import routes from "./routes";

const history = useRouterHistory(createHashHistory)({queryKey: false});

ReactDOM.render(
    <Router history={history}>{routes}</Router>,
    document.getElementById("root")
);

import React from "react";
import { Route, IndexRoute, Redirect} from "react-router";

import Layout from "./Layout";
import RetailUIDemo from "./RetailUIDemo";
import BillingUIDemo from "./BillingUIDemo";

export default (
    <Route path="/" component={Layout}>
        <Route path="/retail-ui" component={RetailUIDemo} />
        <Route path="/billing-ui" component={BillingUIDemo} />
        <Redirect from="*" to="/" />
    </Route>
);

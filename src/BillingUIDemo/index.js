import { Component } from "react";
import Gapped from "retail-ui/components/Gapped";
import Button from "billing-ui/components/Button";

import css from "./billingDemo.css";

class BillingUIDemo extends Component {
    render() {
        return (
            <div className={css.container}>
                <Gapped gap={10}>
                    <Button>Default</Button>
                    <Button>Primary</Button>
                    <Button>Success</Button>
                    <Button>Danger</Button>
                    <Button>Pay</Button>
                </Gapped>
            </div>
        );
    }
}

export default BillingUIDemo;

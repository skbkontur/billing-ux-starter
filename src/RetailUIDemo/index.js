import { Component } from "react";

import Gapped from "retail-ui/components/Gapped";
import Icon from "retail-ui/components/Icon";
import Button from "retail-ui/components/Button";

class RetailUIDemo extends Component {
    render() {
        return (
            <Gapped gap={10}>
                <Button>Default</Button>
                <Button use="primary">Primary</Button>
                <Button use="success">
                    <Gapped gap={5}>
                        <Icon name="ok" />
                        Success
                    </Gapped>
                </Button>
            </Gapped>
        );
    }
}

export default RetailUIDemo;

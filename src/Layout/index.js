import { Component } from "react";
import { Link, IndexLink } from "react-router";
import cx from "classnames";

import "./styles/font.scss";
import "./styles/base.scss";
import css from "./styles/layout.scss";
import links from "./navigationLinks";

class Layout extends Component {
    render () {
        const { children } = this.props;

        return (
            <div className={css["wrapper"]}>
                <div className={css["nav"]}>
                    <aside className={css["nav_main"]}>
                        <IndexLink to="/" className={cx(css["nav_main_title"])} activeClassName={cx(css["-active"])}>
                            Billing<br />
                            UX Starter
                        </IndexLink>

                        <div className={css["nav_main_list"]}>
                            <div className={css.block}>
                                {(links || []).map(link => (
                                    <Link to={`/${link.to}`} className={css["nav_main_item"]}
                                          activeClassName={cx(css["-active"])}>
                                        {link.text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
                <div className={css["container"]}>
                    {children}
                </div>
            </div>
        );
    }
}

export default Layout;

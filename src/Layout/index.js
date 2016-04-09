import { Link, IndexLink } from "react-router";
import css from "./layout.less";

const Layout = ({ children }) => (
    <div className={css.block}>
        <IndexLink to="/retail-ui" activeClassName="-active">
            retail-ui
        </IndexLink>
        <Link to="/billing-ui" activeClassName="-active">
            billing-ui
        </Link>
        {children}
    </div>
);

export default Layout;

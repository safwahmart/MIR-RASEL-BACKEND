import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="berry logo">
        {/* <Logo /> */}
        <img src="/logo.webp" width="210px" height="50px" alt="" />
    </Link>
);

export default LogoSection;

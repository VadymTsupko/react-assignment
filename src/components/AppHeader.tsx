import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppHeader = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        align="center"
        fontWeight="bold"
        sx={{ flexGrow: 1 }}>
        Weather Outfit
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppHeader;

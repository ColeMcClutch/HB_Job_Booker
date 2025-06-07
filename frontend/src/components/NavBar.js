//Create the navgation bar for the application.
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  //Visual elements
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            HB Job Booker
          </Link>
        </Typography>

        {user ? (
          <>
            <Typography sx={{ marginRight: 2 }}>{user.username}</Typography>

            {/*Show this only for posters */}
            {user.role === 'poster' && (
              <Button color="inherit" component={Link} to="/poster">
                My Jobs
              </Button>
            )}

            {/*Show this only for viewers */}
            {user.role === 'viewer' && (
              <Button color="inherit" component={Link} to="/interested">
                Interested
              </Button>
            )}


            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

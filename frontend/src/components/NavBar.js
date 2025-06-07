//Create the navgation bar for the application.
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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
    <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
      <Box sx={{ position: 'relative', display: 'inline-block', flexGrow: 1 }}>
        {/* Red square behind the text */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
            zIndex: 0,
            borderRadius: '4px',
          }}
        />
        {/* Logo text on top */}
        <Typography
          variant="h6"
          sx={{
            position: 'relative',
            zIndex: 1,
            paddingX: 1,
            paddingY: 0.5,
            color: 'white',
          }}
        >
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Handy Brothers Job Booker
          </Link>
        </Typography>
      </Box>


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

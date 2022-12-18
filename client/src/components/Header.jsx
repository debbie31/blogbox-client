import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState();
  return (
    <AppBar position='static' sx={{ background: '#1daabd' }}>
      <Toolbar>
        <Typography variant='h4'>BlogBox</Typography>
        {isLoggedIn && (
          <Box display='flex'>
            <Tabs
              textColor='inherit'
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to='/blogs' label='All blogs' />

              <Tab LinkComponent={Link} to='/blogs/add' label='Create blog' />
            </Tabs>
          </Box>
        )}
        <Box display='flex' marginLeft='auto'>
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to='/auth'
                sx={{ fontSize: '17px', color: '#ffffff' }}
              >
                Login
              </Button>
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to='/auth'
                sx={{ fontSize: '17px', color: '#ffffff' }}
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to='/auth'
              sx={{ fontSize: '17px', color: '#ffffff' }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import LogoutOutlined from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const logout = () => {
    axios.get('http://localhost:8000/api/logout', { withCredentials: true })
      .then(res => {
        router.push('/home');
      })
      .catch(err => console.log(err));
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          {/* Dashboard */}
          <ListItem key={'Dashboard'} disablePadding>
            <ListItemButton onClick={()=>router.push('/admin/dashboard')}>
              <ListItemIcon>
                <DashboardIcon /> 
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>
          {/* Manage users */}
          <ListItem key={'Manage users'} disablePadding>
            <ListItemButton onClick={()=>router.push('/admin/users')}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={'Manage users'} />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
      <Divider />


          {/* All mail */}
          <ListItem key={'All mail'} disablePadding>
            <ListItemButton onClick={()=>router.push('/admin/mail')}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={'All mail'} />
            </ListItemButton>
          </ListItem>
        

        {/* Products */}
        <ListItem key={'Add products'} disablePadding>
          <ListItemButton onClick={()=>router.push('/admin/products')}>
            <ListItemIcon>
              <InventoryIcon/>
            </ListItemIcon>
            <ListItemText primary={'Add products'}/>
          </ListItemButton>
        </ListItem>

        {/* Orders */}
        <ListItem key={'Orders'} disablePadding>
          <ListItemButton onClick={()=>router.push('/admin/orders')}>
            <ListItemIcon>
              <ListAltIcon/>
            </ListItemIcon>
            <ListItemText primary={'Orders'}/>
          </ListItemButton>
        </ListItem>

        <ListItem key={'Trash'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon/>
            </ListItemIcon>
            <ListItemText primary={'Trash'}/>
          </ListItemButton>
        </ListItem>

        {/* Logout */}
        <ListItem key={'Logout'} disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* Menu button to open drawer */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drawerList}
      </SwipeableDrawer>
    </div>
  );
};

export default AdminNavbar;

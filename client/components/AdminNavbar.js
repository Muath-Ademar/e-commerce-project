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
        router.push('/');
      })
      .catch(err => console.log(err));
  };

  const drawerList = (
    <Box
      sx={{ width: 250, height: '100%', backgroundColor:'#da2550' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      
    >
      <List  sx={{color: "white"}}>
          {/* Dashboard */}
          <ListItem  key={'Dashboard'} disablePadding>
            <ListItemButton onClick={()=>router.push('/admin')}>
              <ListItemIcon>
                <DashboardIcon sx={{color: 'white'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>
          {/* Manage users */}
          <ListItem key={'Manage users'} disablePadding>
            <ListItemButton onClick={()=>router.push('/admin/users')}>
              <ListItemIcon>
                <GroupIcon sx={{color: 'white'}} />
              </ListItemIcon>
              <ListItemText primary={'Manage users'} />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
      <Divider />


          {/* All mail */}
          <ListItem sx={{color: 'white'}} key={'All mail'} disablePadding>
            <ListItemButton onClick={()=>router.push('/admin/mail')}>
              <ListItemIcon>
                <MailIcon sx={{color: 'white'}} />
              </ListItemIcon>
              <ListItemText primary={'All mail'} />
            </ListItemButton>
          </ListItem>
        

        {/* Products */}
        <ListItem sx={{color: 'white'}} key={'All products'} disablePadding>
          <ListItemButton onClick={()=>router.push('/admin/products/list')}>
            <ListItemIcon>
              <InventoryIcon sx={{color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={'All products'}/>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{color: 'white'}} key={'Add products'} disablePadding>
          <ListItemButton onClick={()=>router.push('/admin/products')}>
            <ListItemIcon>
              <InventoryIcon sx={{color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={'Add products'}/>
          </ListItemButton>
        </ListItem>

        {/* Orders */}
        <ListItem sx={{color: 'white'}} key={'Orders'} disablePadding>
          <ListItemButton onClick={()=>router.push('/admin/orders')}>
            <ListItemIcon>
              <ListAltIcon sx={{color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={'Orders'}/>
          </ListItemButton>
        </ListItem>
{/* add one for showing all the products */}
        <ListItem sx={{color: 'white'}} key={'Trash'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon sx={{color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={'Trash'}/>
          </ListItemButton>
        </ListItem>

        {/* Logout */}
        <ListItem sx={{color: 'white'}} key={'Logout'} disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutOutlined sx={{color: 'white'}} />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div  >
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

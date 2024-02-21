import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Home, Settings, SsidChart } from "@mui/icons-material";
import { IconButton, ListItemButton } from "@mui/material";
import DrawerHeaderComponent from "../widgets/Custom_drawerheader";
import { Link } from "react-router-dom"; 
import { Box, styled } from "@mui/system";



function SideBar() {
  return (
    <Drawer variant="permanent" sx={{bgcolor:"grey"}}>
      <DrawerHeaderComponent />
      <center>
      <List>
      <Link to="/">
          <ListItem>
          
            <div>
              <center>
                <IconButton aria-label="Home">
                
                  <Home />
                </IconButton>
                <ListItemText primary="Home" />
              </center>
            </div>
          </ListItem>
          </Link>
          <Link to="/statistics"><ListItem>
            <div>
              <center>
                <IconButton aria-label="Stats">
                
                  <SsidChart />
                </IconButton>
                <ListItemText primary="Statistics" />
              </center>
            </div>
          </ListItem>
          </Link>
          <Link to="/settings"><ListItem>
            <div>
              <center>
                <IconButton aria-label="Settings">
                  <Settings />
                </IconButton>
                <ListItemText primary="Settings" />
              </center>
            </div>
          </ListItem>
          </Link>
        
      </List>
      </center>
    </Drawer>
  );
}

export default SideBar;

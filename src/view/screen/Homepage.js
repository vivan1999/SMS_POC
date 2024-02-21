
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect} from 'react';
import { ReactComponent as ReactLogo } from '../../assets/KT_Line.svg';
import { RectangleRounded } from '@mui/icons-material';
import AppNavBarComponent from "../widgets/Custom_appbar";
import { useSVGViewModel } from '../../view_models/SVG_viewModel';
import {BoxDate,BoxTitle} from '../Styled.js';

const todayDate = new Date();


function HomePage() {
  const { loading, svgDataList, setLoadingState } = useSVGViewModel();
  let prevIndex, prevIndexId, currIndexId, trackName, currIndexCond, currIndexWorking;
  useEffect(() => {
    for (let i = 0; i < svgDataList.length; i++) {

      //for 1st Station===
      if (i === 0 && svgDataList[i].reached === "true") {
        const stationId = svgDataList[i].station_id;
        const station1 = document.getElementById(stationId);
        station1.querySelectorAll("path").forEach(path => {
          if (path.id === stationId + "_OB") {
            path.setAttribute("class", "cls-16");
          }
          if (path.id === stationId + "_O") {
            if (svgDataList[i].station_condition === "bad" && svgDataList[i].station_working === "true") {
              path.setAttribute("class", "cls-33");
            }
            else if (svgDataList[i].station_condition === "bad" && svgDataList[i].station_working === "false") {
              path.setAttribute("class", "cls-44");
            }
          }

        });
        station1.querySelectorAll("circle").forEach(path => {
          if (path.id === stationId + "_OB") {
            path.setAttribute("class", "cls-16");
          }
        });
        station1.querySelectorAll("text").forEach(text => {
          if (text.id === stationId + "_C") {
            text.setAttribute("class", "cls-21");
          }
          if (text.id === stationId + "-2") {
            text.setAttribute("class", "cls-17");
          }
        });
      }
      //for other stations
      else if (i > 0) {
        prevIndex = i - 1;
        prevIndexId = svgDataList[prevIndex].station_id;
        currIndexId = svgDataList[i].station_id;
        currIndexCond = svgDataList[i].station_condition;
        currIndexWorking = svgDataList[i].station_working;
        trackName = prevIndexId + "_" + currIndexId;
        if (svgDataList[i].reached === "true") {
          //update path with the previous station
          if(svgDataList[prevIndex].reached === "true"){
            const track = document.getElementById(trackName);
            track.setAttribute("class", "cls-2");
          }
          
          //updating stations layout
          const station1 = document.getElementById(currIndexId);
          station1.querySelectorAll("path").forEach(path => {
            if (path.id === currIndexId + "_OB") {
              path.setAttribute("class", "cls-16");
            }
            if (path.id === currIndexId + "_O") {
              if (currIndexCond === "bad" && currIndexWorking === "true") {

                path.setAttribute("class", "cls-33");
              }
              else if (currIndexCond === "bad" && currIndexWorking === "false") {

                path.setAttribute("class", "cls-44");
              }
            }

          });
          station1.querySelectorAll("circle").forEach(path => {
            if (path.id === currIndexId + "_OB") {
              path.setAttribute("class", "cls-16");
            }
          });
          station1.querySelectorAll("text").forEach(text => {
            if (text.id === currIndexId + "_C") {
              text.setAttribute("class", "cls-21");
            }
            if (text.id === currIndexId + "-2") {
              text.setAttribute("class", "cls-17");
            }
          });
        }
      }
    }
  });


  return (
    <Box sx={{ paddingLeft: 2 }}>
      <div>

        <AppNavBarComponent />

        <div><BoxTitle>Stray Current Monitoring System</BoxTitle></div>
        <div><BoxDate>Last updated by : {todayDate.getDate()}/{todayDate.getMonth()}/{todayDate.getFullYear()}</BoxDate></div>

        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Box sx={{ paddingLeft: 10, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <List>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <RectangleRounded style={{ color: "green", width: 50 }} />
                    </ListItemIcon>
                    <ListItemText primary="Kwun Tong Line" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <RectangleRounded style={{ color: "grey", width: 50 }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: "grey" }} primary="Tuen Ma Line Phase 1" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <RectangleRounded style={{ color: "grey", width: 50 }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: "grey" }} primary="East Rail Line" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <RectangleRounded style={{ color: "grey", width: 50 }} />
                    </ListItemIcon>
                    <ListItemText style={{ color: "grey" }} primary="Tsuen Wan Line" />
                  </ListItemButton>
                </ListItem>
              </List>

            </Box>
          </Grid >
          <Grid item xs={8}>
            <Box sx={{ paddingLeft: 10, width: '100%', bgcolor: 'background.paper' }}><ReactLogo /></Box>

          </Grid></Grid>
      </div>
    </Box>
  );
}

export default HomePage;

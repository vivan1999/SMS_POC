import { Box } from "@mui/system";
import { useState } from "react";
import AppNavBarComponent from "../widgets/Custom_appbar";
import { Divider, FormControl, Grid, List, ListItem, ListItemButton, ListItemText, MenuItem, Select } from "@mui/material";
import { useStatsVoltViewModel } from "../../view_models/Stats_VoltViewModel";
import LineChart from "../charts/VoltDataLineChart";
import {containerStyle,chartStyle} from '../Styled.js';

function SettingsPage() {
    var [tabIndex, setTabIndex] = useState(0);
    var [selectedValueDropDown, setSelectedValue] = useState("Kwun Tong Line");
    const { loading, dataVoltageMain, maxData, sepVoltageData, sepTimeData, setLoadingState } = useStatsVoltViewModel();

    const chartOptions=()=> {
        return (
            <Box sx={{ width: 300, height: 700, maxWidth: 360, bgcolor: 'lightgrey' }}>
                <List>

                    <ListItem onClick={() => setTabIndex(0)} disablePadding selected={tabIndex === 0 ? ("true") : ("false")} style={tabIndex === 0 ? { backgroundColor: 'white', color: 'black' } : {}} >
                        <ListItemButton>
                            <ListItemText primary="Reference Set" />
                        </ListItemButton>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem disablePadding onClick={() => setTabIndex(1)} selected={tabIndex === 0 ? ("true") : ("false")} style={tabIndex === 1 ? { backgroundColor: 'white', color: 'black' } : {}}>
                        <ListItemButton>
                            <ListItemText primary="Export Data" />
                        </ListItemButton>
                    </ListItem>
                    <Divider></Divider>
                </List>
            </Box>
        );
    }

    const dateOptions=()=>{


        const handleChange = (event) => {
            setSelectedValue(event.target.value);
        };
    
        return (
            <Box sx={{ paddingLeft: 1, paddingTop: 1, width: 300, height: 700, maxWidth: 360, bgcolor: 'lightgrey' }}>
                <div><h3>Settings</h3></div>
                <Box sx={{ height: 7 }} />
                <div>Line</div>
                <Box sx={{ height: 5 }} />
                <Box>
                    <FormControl>
                        <Select
                            value={selectedValueDropDown}
                            onChange={handleChange}
                        >
                            <MenuItem value="Kwun Tong Line">Kwun Tong Line</MenuItem>
                            <MenuItem value="Tuen Ma Line Phase 1">Tuen Ma Line Phase 1</MenuItem>
                            <MenuItem value="East Rail Line">East Rail Line</MenuItem>
                            <MenuItem value="Tsuen Wan Line">Tsuen Wan Line</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ height: 15 }} />
                <div>Active Reference Set</div>
                <Box sx={{ height: 13 }} />

                <div>Reference Set:</div>
                <Box sx={{ height: 10 }} />
                <div><b>1 (Initial Recording)</b></div>
                <Box sx={{ height: 13 }} />
                <div>Recording Date:</div>
                <Box sx={{ height: 10 }} />
                <div><b>28 July 2023</b></div>

            </Box>
        );
    }

    

    return (
        <Box sx={{ paddingLeft: 2 }}>
            <div className="statsDiv">
                <div className="App">
                    <AppNavBarComponent />
                </div>
                <Box sx={{ paddingLeft: 10 }}>
                    <Grid container direction="row" justifyContent="space-between"
                        alignItems="flex-start">
                        <Grid item direction="column" alignItems="flex-start">
                            {chartOptions()}
                        </Grid>
                        <Grid item direction="column" alignItems="flex-start" justifyContent="flex-start">
                            <Box sx={{ width: 610, height: 700, bgcolor: 'white' }}>
                                <div><h3>Reference Set</h3>
                                </div>
                                <Box sx={{ height: 30 }} />
                                {tabIndex === 0 ?
                                    (<div style={containerStyle}>
                                        <div style={chartStyle}>
                                            <LineChart data={maxData} />
                                        </div>
                                    </div>) : (<div>Export Data Page</div>)}
                            </Box>
                        </Grid>
                        <Grid item direction="column" justifyContent="flex-start"
                            alignItems="center">
                            {dateOptions()}
                        </Grid>
                    </Grid></Box></div></Box>

    );


}

export { SettingsPage };
import { Divider, Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { containerStyle, chartStyle } from '../Styled.js';
import { useState, useEffect } from "react";
import LineChart from "../charts/VoltDataLineChart";
import AppNavBarComponent from "../widgets/Custom_appbar";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useStatsVoltViewModel } from '../../view_models/Stats_VoltViewModel';
import ShortTimeVsTimeChart from "../charts/ShortTimeVsTime";
import ScatterChart from "../charts/VoltDataScatterChart";
import dayjs from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';





function InitStats() {
    const { loading, dataVoltageMain, maxData, sepVoltageData, sepTimeData, aggregatedData, setLoadingState } = useStatsVoltViewModel();
    var [tabIndex, setTabIndex] = useState(0);
    var [selectedValueDropDown, setSelectedValue] = useState("Kwun Tong Line");
    var [startDate, setStartDate] = useState(dayjs("2023-07-28T00:00"));
    var [endDate, setEndDate] = useState(dayjs("2023-07-28T24:00"));

    const chartOptions = () => {

        return (
            <Box sx={{ width: 300, height: 700, maxWidth: 360, bgcolor: 'lightgrey' }}>
                <List>

                    <ListItem onClick={() => setTabIndex(0)} disablePadding selected={tabIndex === 0 ? ("true") : ("false")} style={tabIndex === 0 ? { backgroundColor: 'white', color: 'black' } : {}} >
                        <ListItemButton>
                            <ListItemText primary="Short-time average vs. location" />
                        </ListItemButton>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem disablePadding onClick={() => setTabIndex(1)} selected={tabIndex === 0 ? ("true") : ("false")} style={tabIndex === 1 ? { backgroundColor: 'white', color: 'black' } : {}}>
                        <ListItemButton>
                            <ListItemText primary="Long-time average vs. location" />
                        </ListItemButton>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem disablePadding onClick={() => setTabIndex(2)} selected={tabIndex === 0 ? ("true") : ("false")} style={tabIndex === 2 ? { backgroundColor: 'white', color: 'black' } : {}}>
                        <ListItemButton>
                            <ListItemText primary="Short-time average vs. time" />
                        </ListItemButton>
                    </ListItem>
                    <Divider></Divider>
                </List>
            </Box>
        );
    }
    const dateOptions = () => {


        const handleStartDateTimeChange = (date) => {

            setStartDate(date);

        };

        const handleEndDateTimeChange = (date) => {
            setEndDate(date);
        };

        const handleChange = (event) => {
            setSelectedValue(event.target.value);
        };
        return (
            <Box sx={{ paddingLeft: 1, paddingTop: 1, width: 300, height: 700, maxWidth: 360, bgcolor: 'lightgrey' }}>
                <div><h3>Date Range</h3></div>
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
                <Box sx={{ height: 7 }} />
                <div>Start Date :</div>
                <Box sx={{ height: 5 }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker value={startDate} defaultValue={startDate} label="Choose Date & Time" onChange={handleStartDateTimeChange} />
                    </DemoContainer>
                </LocalizationProvider>
                <Box sx={{ height: 7 }} />
                <div>End Date :</div>
                <Box sx={{ height: 5 }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker value={endDate} defaultValue={endDate} label="Choose Date & Time" onChange={handleEndDateTimeChange} />
                    </DemoContainer>
                </LocalizationProvider>
                <Box sx={{ height: 7 }} />
                <Box sx={{ height: 13 }} />

                <div>TAVW (Time Average Value Windows)</div>
                <Box sx={{ height: 10 }} />
                <div><b>6 Minutes</b></div>

            </Box>
        );
    }
    const StatisticsIndex0 = () => {

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

                                    <div> <h3>RAIL POTENTIAL : Short-time average versus location</h3>
                                    </div>

                                    <Box sx={{ height: 30 }} />
                                    {loading === true ?
                                        (<p><h3>Loading Chart.....</h3></p>) :
                                        (<div style={containerStyle}>
                                            <div style={chartStyle}>
                                                <ScatterChart data={aggregatedData} />
                                            </div>
                                            <div style={chartStyle}>
                                                <LineChart data={maxData} />
                                            </div>

                                        </div>)}


                                </Box>
                            </Grid>
                            <Grid item direction="column" justifyContent="flex-start"
                                alignItems="center">

                                {dateOptions()}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Box>
        );
    }

    const StatisticsIndex1 = () => {

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

                                    <div> <h3>RAIL POTENTIAL : Long-time average versus location</h3>
                                    </div>

                                    <Box sx={{ height: 30 }} />
                                    {loading === true ?
                                        (<p><h3>Loading Chart.....</h3></p>) :
                                        (<div style={containerStyle}>
                                            <div style={chartStyle}>
                                                <LineChart data={maxData} />
                                            </div>
                                            <div style={chartStyle}>
                                                <ScatterChart data={aggregatedData} />
                                            </div>


                                        </div>)}


                                </Box>
                            </Grid>
                            <Grid item direction="column" justifyContent="flex-start"
                                alignItems="center">

                                {dateOptions()}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Box>
        );
    }

    const StatisticsIndex2 = () => {
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

                                    <div> <h3>RAIL POTENTIAL : Short-time average versus time</h3>
                                    </div>

                                    <Box sx={{ height: 30 }} />
                                    {loading === true ?
                                        (<p><h3>Loading Chart.....</h3></p>) :
                                        (<div style={containerStyle}>
                                            <div style={chartStyle}>
                                                <ShortTimeVsTimeChart dataVoltageMain={aggregatedData} />
                                            </div>
                                        </div>)}



                                </Box>
                            </Grid>
                            <Grid item direction="column" justifyContent="flex-start"
                                alignItems="center">

                                {dateOptions()}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Box>
        );
    }





    useEffect(() => {

    }, []);

    return (
        tabIndex === 0 ? <StatisticsIndex0 /> : tabIndex === 1 ? <StatisticsIndex1 /> : <StatisticsIndex2 />

    );

}




export { InitStats };
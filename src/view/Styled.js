import { styled } from '@mui/system';

export const BoxTitle = styled('div')(({ theme }) => ({
    alignContent: "start",
    display: "flex",
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(12),
    fontSize: 25, fontWeight: "bold"
  
  }));
  
export const BoxDate = styled('div')(({ theme }) => ({
    alignContent: "start",
    display: "flex",
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(12),
    fontSize: 15, color: "grey"
  
  }));


export const containerStyle = {
    position: 'relative', // Make the container a reference for absolute positioning
    width: '100%',
    height: '500px', // Set the desired height for the container
};

export const chartStyle = {
    position: 'absolute', // Position the charts within the container
    top: '0', // Adjust top and left values as needed for positioning
    left: '0',
    width: '100%',
    height: '100%',
};
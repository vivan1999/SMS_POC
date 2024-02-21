import React from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import { Apps } from '@mui/icons-material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.4),
    backgroundColor: "black",
    justifyContent: 'flex-end',
}));

function DrawerHeaderComponent() {

    return (
        <DrawerHeader>
            <IconButton>
                <Apps style={{color:"white",fontSize:25}}/>
            </IconButton><t></t>
        </DrawerHeader>
    );
}

export default DrawerHeaderComponent;

import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { TextField } from '@mui/material';
import dayjs from 'dayjs';

function DateTimePickerComponent() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeChange = (newDateTime) => {
    console.log("Date Change:",newDateTime);
    setSelectedDateTime(newDateTime);
  };

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker defaultValue={dayjs("2023-07-28T06:00")} label="Choose Date & Time" onChange={handleDateTimeChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateTimePickerComponent;

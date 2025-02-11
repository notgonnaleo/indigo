import React, { useState } from "react";
import MainLayout from '../components/layout/MainLayout';
import { Modal, Box, Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";

const Homepage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: SelectChangeEvent) => setSelectedOption(event.target.value);

    return (
        <>
        <MainLayout>
            <div style={{ padding: '20px' }}>
                <h1>Hello World</h1>
            </div>
            <Button variant="contained" onClick={handleOpen}>Open Modal</Button>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
            <Box
                sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                }}
            >
                <h2 id="modal-title">Select an Option</h2>
                
                <FormControl fullWidth>
                <InputLabel id="dropdown-label">Options</InputLabel>
                <Select
                    labelId="dropdown-label"
                    value={selectedOption}
                    onChange={handleChange}
                    label="Options"
                >
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                </Select>
                </FormControl>

                <Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>
                Close
                </Button>
            </Box>
            </Modal>
        </MainLayout>
        </>
    );
};

export default Homepage;
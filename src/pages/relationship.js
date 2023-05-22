import React, { useState } from "react";
import {
    Breadcrumbs, Autocomplete, Link, TextField, Typography, Stack, Box, Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import cookie from 'react-cookies'

export default function Relationship() {
    const options = [{ label: '供应', value: 'supply' }, { label: '管理', value: 'manage' }, { label: '合作', value: 'cooperate' }]

    const navigator = useNavigate()

    const [selectedValue, setSelectedValue] = useState(null)

    const handleSelectionChange = (event, newValue) => {
        setSelectedValue(newValue);
    };

    function handleButtonClick() {
        cookie.save('selection', selectedValue.value)
        navigator('/mode')
    }


    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 30, m: 3 }}>
                <Typography color="text.primary" fontSize={30}>当前位置: </Typography>
                <Link
                    underline="hover"
                    color="text.primary"
                    href="/"
                    aria-current="page"
                >
                    relationship
                </Link>
            </Breadcrumbs>
            <div>
                <h1 style={{ textAlign: "center", fontSize: 60 }}>请选择价值链关系</h1>
                <Box
                    justifyContent="center"
                    width={'100%'}
                >
                    <Stack direction="row" spacing={2} justifyContent='center' margin={30} display="flex" sx={{ height: '300px' }}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            sx={{ width: "900px" }}
                            onChange={handleSelectionChange}
                            renderOption={(props, option, { selected }) => (
                                <li {...props} style={{ fontSize: '25px' }}>
                                    {option.label}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params}
                                    InputProps={{ ...params.InputProps, style: { fontSize: '25px' } }}
                                    InputLabelProps={{ ...params.InputLabelProps, style: { fontSize: '25px' } }}
                                    label="selection"></TextField>
                            )}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent='center' sx={{ width: '100%', height: '50px' }} display="flex">
                        <Button onClick={handleButtonClick} variant="contained" size="large" sx={{ width: '5%', height: '100%', fontSize: '30px' }}>
                            确认
                        </Button>
                    </Stack>
                </Box>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import {DemoItem} from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chart from "react-apexcharts";


const Stretch = () => {
    const [loading, setLoading] = useState(true); 
    const [initialDate, setInitialDate] = useState(dayjs('2010-01-16'));
    const [finalDate, setFinalDate] = useState(dayjs('2010-04-28'));
    const [history, sethistory] = useState([]);

    const API = "http://localhost:4000"

    // CHART
    const series = [{
      name: 'Consumo',
      type: 'area',
      data: history.map(val =>{
        console.log("consumo", val.consumo)
        return val.consumo
      })
    }, {
      name: 'Perdida',
      type: 'area',
      data: history.map(val =>{
        console.log("perdidas)", (val.perdidas).toFixed(2))
        return (val.perdidas).toFixed(2)
      })
    }, {
      name: 'Costo',
      type: 'area',
      data: history.map(val =>{
        console.log("costo", (val.costo).toFixed(2))
        return (val.costo).toFixed(2)
      })
    }]

    const options = {
      chart: {
        height: 328,
        type:'area',
        zoom: {
          enabled: false
        },
        dropShadow: {
          enabled: true,
          top: 3,
          left: 2,
          blur: 4,
          opacity: 1,
        }
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Historico',
        align: 'left',
        offsetY: 25,
        offsetX: 20
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
          size: 9
        }
      },
      grid: {
        show: true,
        padding: {
          bottom: 0
        }
      },
      tooltip: {
        followCursor: true
      },
      fill: {
        opacity: 1,
      },
      labels: history.map(val =>{
        console.log("Linea", val.Linea)
        return val.Linea
      }),
      xaxis: {
        tooltip: {
          enabled: false
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -20
      }
    }

    const cardStyle = {
      borderRadius: '16px', 
      width: '70%',
      maxWidth: { xs: '400px', sm: '600px', md: '1300px' }, 
      margin: 'auto', 
      marginTop: '100px',
      border: '2px solid #ccc'
    };


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));

    function handleClick() {
      fetchData()
    }


    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API}/tramos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fechainicial: initialDate.format("YYYY-MM-DD"),
              fechafinal: finalDate.format("YYYY-MM-DD")
            }),
          });
          
          const jsonData = await response.json();
          console.log("jsonData", jsonData)
          sethistory(jsonData);
          setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);
  
    return (
      <Card sx={cardStyle}>
        <CardHeader
        title={
          <Typography variant="h3" sx={{ color: 'white', padding: '8px' }} fontWeight="bold">
            Histórico Tramos
          </Typography>
        }
        sx={{ backgroundColor: '#9C27B0',  borderRadius: '2px', border: '1px solid #ccc' }}
      />
        <CardContent>
          <Collapse in={loading}>
              <Typography variant="h4" sx={{padding: '30px' }}>
                Cargando ...
              </Typography>
              <Box sx={{ width: '80%', margin: 'auto', paddingBottom: '50px' }}>
                <LinearProgress />
              </Box>
          </Collapse>
          <Collapse in={!loading}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <FormControl sx={{
                  '& > :not(style)': { m: 2, width: '40ch', },
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem label="Inicio">
                      <DateTimePicker
                        label="Fecha inicial"
                        value={initialDate}
                        onChange={(newValue) => setInitialDate(newValue)}
                      />
                      </DemoItem>
                    </LocalizationProvider>
                </FormControl >
                <FormControl sx={{
                  '& > :not(style)': { m: 2, width: '40ch', },
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem label="Fin">
                        <DateTimePicker
                          label="Fecha final"
                          value={finalDate}
                          onChange={(newValue) => setFinalDate(newValue)}
                        />
                      </DemoItem>
                    </LocalizationProvider>
                </FormControl>
                <FormControl sx={{
                  '& > :not(style)': { m: 0,  marginTop: '45px', marginLeft: '20px'},
                }}>
                    <Button onClick={handleClick} endIcon={<SearchIcon />} sx={{backgroundColor: '#282c34', color: '#FFFFFF', width: '150px', height: '50px', marginTop: '100px'}}>
                      Buscar
                    </Button>
                </FormControl>
              </Box>


              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300, maxWidth: 1200, margin: '20px' }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Linea</StyledTableCell>
                      <StyledTableCell align="right">Consumo</StyledTableCell>
                      <StyledTableCell align="right">Perdida</StyledTableCell>
                      <StyledTableCell align="right">Costo</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((row) => (
                      <StyledTableRow key={row.Linea}>
                        <StyledTableCell component="th" scope="row">
                          {row.Linea}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.consumo}</StyledTableCell>
                        <StyledTableCell align="right">{(row.perdidas).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="right">{(row.costo).toFixed(2)}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                  <Collapse in={history.length == 0}>
                  <Typography variant="h4" sx={{ color: 'black', padding: '8px', width: '100%', margin: 'auto' }} fontWeight="bold">
                      No hay registros
                  </Typography>
                  </Collapse>
              </TableContainer>
              <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={2} sx={{marginTop: '50px' }}>
                  <Grid item xs={12}>
                    <Card sx={{ borderRadius: '16px', border: '1px solid #ccc' }}>
                      <CardContent>
                        <Typography variant="h5" sx={{ color: '#9C27B0', padding: '8px', width: '100%'}} fontWeight="bold">
                            Gráfico Histórico
                        </Typography>
                        <Chart
                          options={options}
                          series={series}
                          type="area"
                          width="1200"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
          </Collapse>
        </CardContent>
      </Card >
    );
}

export default Stretch;
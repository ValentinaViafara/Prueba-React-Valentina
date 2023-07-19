import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { DemoItem} from '@mui/x-date-pickers/internals/demo';
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


const Client = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [initialDate, setInitialDate] = useState(dayjs('2010-01-16'));
    const [finalDate, setFinalDate] = useState(dayjs('2010-04-28'));
    const [history, sethistory] = useState([]);

    const API = "http://localhost:4000"

    // CHART 1
    const series = [{
      name: 'Residencial',
      type: 'column',
      data: history.map(val =>{
        console.log("consumo_residencial", val.consumo_residencial)
        return val.consumo_residencial
      })
    }, {
      name: 'Comercial',
      type: 'area',
      data: history.map(val =>{
        console.log("consumo_comercial", val.consumo_comercial)
        return val.consumo_comercial
      })
    }, {
      name: 'Industrial',
      type: 'line',
      data: history.map(val =>{
        console.log("consumo_industrial", val.consumo_industrial)
        return val.consumo_industrial
      })
    }]

    const options = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
            left: 2,
            top: 2,
            opacity: 0.5
        },
        style: {
          fontSize: '12px',
        },
        background: {
          enabled: true,
          foreColor: '#000',
        },
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: history.map(val =>{
        console.log("Linea", val.Linea)
        return val.Linea
      }),
      markers: {
        size: 0
      },
      xaxis: {
        tooltip: {
          enabled: false
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: 10
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y) => {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
      
          }
        }
      }
    }

    // CHART 2
    const series2 = [{
      name: 'Residencial',
      type: 'column',
      data: history.map(val =>{
        console.log("perdidas_residencial", (val.perdidas_residencial).toFixed(2))
        return (val.perdidas_residencial).toFixed(2)
      })
    }, {
      name: 'Comercial',
      type: 'area',
      data: history.map(val =>{
        console.log("perdidas_comercial", (val.perdidas_comercial).toFixed(2))
        return (val.perdidas_comercial).toFixed(2)
      })
    }, {
      name: 'Industrial',
      type: 'line',
      data: history.map(val =>{
        console.log("perdidas_industrial", (val.perdidas_industrial).toFixed(2))
        return (val.perdidas_industrial).toFixed(2)
      })
    }]

    const options2 = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
            left: 2,
            top: 2,
            opacity: 0.5
        },
        style: {
          fontSize: '12px',
        },
        background: {
          enabled: true,
          foreColor: '#000',
        },
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: history.map(val =>{
        return val.Linea
      }),
      markers: {
        size: 0
      },
      xaxis: {
        type: 'string'
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y) => {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
      
          }
        }
      }
    }

    // CHART 3
    const series3 = [{
      name: 'Residencial',
      type: 'column',
      data: history.map(val =>{
        console.log("costo_residencial", (val.costo_residencial).toFixed(2))
        return (val.costo_residencial).toFixed(2)
      })
    }, {
      name: 'Comercial',
      type: 'area',
      data: history.map(val =>{
        console.log("costo_comercial", (val.costo_comercial).toFixed(2))
        return (val.costo_comercial).toFixed(2)
      })
    }, {
      name: 'Industrial',
      type: 'line',
      data: history.map(val =>{
        console.log("costo_industrial", (val.costo_industrial).toFixed(2))
        return (val.costo_industrial).toFixed(2)
      })
    }]

    const options3 = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
            left: 2,
            top: 2,
            opacity: 0.5
        },
        style: {
          fontSize: '12px',
        },
        background: {
          enabled: true,
          foreColor: '#000',
        },
      },
      
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: history.map(val =>{
        console.log("Linea", val.Linea)
        return val.Linea
      }),
      markers: {
        size: 0
      },
      xaxis: {
        tooltip: {
          enabled: false
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: 10
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y) => {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
      
          }
        }
      }
    }

    const cardStyle = {
      borderRadius: '16px', 
      width: '70%',
      maxWidth: { xs: '1200px', sm: '1500px', md: '2500px' }, 
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
        console.log("initial date", initialDate.format("YYYY-MM-DD"))
        console.log("initial date", finalDate.format("YYYY-MM-DD"))
        const response = await fetch(`${API}/cliente`, {
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
            Histórico Clientes
          </Typography>
        }
        sx={{ backgroundColor: '#008000',  borderRadius: '2px', border: '1px solid #ccc' }}
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
                  '& > :not(style)': { m: 2, width: '80ch', },
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
                  '& > :not(style)': { m: 2, width: '80ch', },
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
                <Table sx={{ minWidth: 700, margin: '40px' }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Linea</StyledTableCell>
                      <StyledTableCell align="right">Consumo Residencial</StyledTableCell>
                      <StyledTableCell align="right">Consumo Comercial</StyledTableCell>
                      <StyledTableCell align="right">Consumo Industrial</StyledTableCell>
                      <StyledTableCell align="right">Perdida Residencial</StyledTableCell>
                      <StyledTableCell align="right">Perdida Comercial</StyledTableCell>
                      <StyledTableCell align="right">Perdida Industrial</StyledTableCell>
                      <StyledTableCell align="right">Costo Residencial</StyledTableCell>
                      <StyledTableCell align="right">Costo Comercial</StyledTableCell>
                      <StyledTableCell align="right">Costo Industrial</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((row) => (
                      <StyledTableRow key={row.Linea}>
                        <StyledTableCell component="th" scope="row">
                          {row.Linea}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.consumo_residencial}</StyledTableCell>
                        <StyledTableCell align="right">{row.consumo_comercial}</StyledTableCell>
                        <StyledTableCell align="right">{row.consumo_industrial}</StyledTableCell>
                        <StyledTableCell align="right">{(row.perdidas_residencial).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="right">{(row.perdidas_comercial).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="right">{(row.perdidas_industrial).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="right">{(row.costo_residencial).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="right">{(row.costo_comercial).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="right">{(row.costo_industrial).toFixed(2)}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                  <Collapse in={history.length == 0}>
                  <Typography variant="h4" sx={{ color: 'black', padding: '8px', width: '100%', margin: 'auto' }} fontWeight="bold">
                      Consumo
                  </Typography>
                  </Collapse>
              </TableContainer>
              <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={2} sx={{marginTop: '50px' }}>
                  <Grid item xs={4}>
                    <Card sx={{ borderRadius: '16px', border: '1px solid #ccc' }}>
                      <CardContent>
                        <Typography variant="h5" sx={{ color: '#008000', padding: '8px', width: '100%', margin: 'auto' }} fontWeight="bold">
                            Consumo
                        </Typography>
                        <Chart
                          options={options}
                          series={series}
                          type="bar"
                          width="600"
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card  sx={{ borderRadius: '16px', border: '1px solid #ccc'}}>
                      <CardContent>
                        <Typography variant="h5" sx={{ color: '#008000', padding: '8px', width: '100%', margin: 'auto' }} fontWeight="bold">
                            Perdida
                        </Typography>
                        <Chart
                          options={options2}
                          series={series2}
                          type="bar"
                          width="600"
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card  sx={{ borderRadius: '16px', border: '1px solid #ccc'}}>
                      <CardContent>
                        <Typography variant="h5" sx={{ color: '#008000', padding: '8px', width: '100%', margin: 'auto' }} fontWeight="bold">
                            Costo
                        </Typography>
                        <Chart
                          options={options3}
                          series={series3}
                          type="bar"
                          width="600"
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

export default Client;
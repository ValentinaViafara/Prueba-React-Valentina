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
import TableSortLabel from '@mui/material/TableSortLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';


const ClientStretch = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [initialDate, setInitialDate] = useState(dayjs('2010-01-16'));
    const [finalDate, setFinalDate] = useState(dayjs('2010-04-28'));
    const [history, sethistory] = useState([]);
    const [sort, setSort] = useState('asc');

    const API = "http://localhost:4000"

    const cardStyle = {
      borderRadius: '16px', 
      width: '70%',
      maxWidth: { xs: '400px', sm: '500px', md: '900px' },
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

    function sortData(){
      var aux = history

      if (sort == 'asc'){
        aux.sort(((a, b) => {return a.Perdidas - b.Perdidas}))
          setSort('desc')
        }
        else{
          aux.sort(((a, b) => {return b.Perdidas - a.Perdidas}))
          setSort('asc')
        }
        sethistory(aux)
    }


    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API}/tramos-cliente`, {
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
        sethistory(jsonData);
        setLoading(false)
      } catch (error) {
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const increment = () => {
      setCount(count + 1);
    };
  
    const decrement = () => {
      setCount(count - 1);
    };
  
    return (
      <Card sx={cardStyle}>
        <CardHeader
        title={
          <Typography variant="h3" sx={{ color: 'white', padding: '8px' }} fontWeight="bold">
            Histórico Clientes - Tramos
          </Typography>
        }
        sx={{ backgroundColor: '#2196F3',  borderRadius: '2px', border: '1px solid #ccc' }}
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
                  '& > :not(style)': { m: 0,  marginTop: '20px', marginLeft: '20px'},
                }}>
                    <Button onClick={handleClick} endIcon={<SearchIcon />} sx={{backgroundColor: '#282c34', color: '#FFFFFF', width: '500px', height: '50px', marginTop: '100px'}}>
                      Buscar
                    </Button>
                </FormControl>
              </Box>


              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300, maxWidth: 800, margin: '40px' }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Linea</StyledTableCell>
                      <StyledTableCell align="right">Tipo Consumo</StyledTableCell>
                      <TableSortLabel
                        active={true}
                        direction={sort}
                        onClick={sortData}

                      >
                        {"Perdidas"}
                        {true ? (
                          <Box component="span" sx={visuallyHidden}>
                            {'sorted descending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                      <StyledTableCell align="right">Porcentaje perdidas</StyledTableCell>
                     
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((row, idx) => (
                      <StyledTableRow key={idx}>
                        <StyledTableCell component="th" scope="row">
                          {row.Linea}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.TipoConsumo}</StyledTableCell>
                        <StyledTableCell align="right">{(row.Perdidas).toFixed(4)}</StyledTableCell>
                        <StyledTableCell align="right">{(row.Perdidas* 100).toFixed(2) }%</StyledTableCell>
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
              
          </Collapse>
        </CardContent>
      </Card >
    );
}

export default ClientStretch;
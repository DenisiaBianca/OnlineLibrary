import { Checkbox, FormControlLabel, makeStyles, TextField } from '@material-ui/core';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useState } from 'react'
import { IFilter } from '../interfaces/products';
import { DateTimePicker } from '@mui/lab';
import { YearRangePicker } from 'react-year-range-picker';

interface IProps {
    setFilter: any;
    filter: IFilter;
}

const useStyle = makeStyles(() => ({
    list: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '30px'
    }
}));

export const Filters : React.FC<IProps> = ({filter, setFilter}) => {
    const classes = useStyle();
    const [Books, setBooks] = useState(true);
    const [Magazines, setMagazines] = useState(true);
    const [CD, setCD] = useState(true);
    const [DVD, setDVD] = useState(true);
    const [beginYear, setBeginYear] = useState<number>();
    const [endYear, setEndYear] = useState<number>();

    function filterProductsAfterType(typeName:string, typeValue: boolean){
        setFilter({...filter, [typeName]: typeValue});
    }

    function selectOrDeselectAll(){
        if(!(Books && Magazines && DVD && CD)){
            setBooks(true); setMagazines(true); setDVD(true); setCD(true);
            setFilter({...filter, Books: true, Magazines: true, CD: true, DVD: true});
        }
        else{
            setBooks(false); setMagazines(false); setDVD(false); setCD(false);
            setFilter({...filter, Books: false, Magazines: false, CD: false, DVD: false});
        }
    }

    function filterProductsAfterPeriod(beginPeriod: number, endPeriod: number){
        setBeginYear(beginPeriod); setEndYear(endPeriod);
        setFilter({...filter, BeginYear: beginPeriod, EndYear: endPeriod});
    }


  return (
    <div>
        <h4>Product Type:</h4>
        <div className={classes.list}>
            <FormControlLabel
                control={<Checkbox checked={Books && Magazines && DVD && CD} onChange={()=> selectOrDeselectAll()} name="allbooks" />}
                label="All"/>  
            <FormControlLabel
                control={<Checkbox checked={Books} onChange={()=> {setBooks(!Books); filterProductsAfterType("Books", !Books)}} name="books" />}
                label="Books"/>
            <FormControlLabel
                control={<Checkbox checked={Magazines} onChange={()=> {setMagazines(!Magazines); filterProductsAfterType("Magazines", !Magazines)}} name="magazines" />}
                label="Magazines"/>
            <FormControlLabel
                control={<Checkbox checked={DVD} onChange={()=> {setDVD(!DVD); filterProductsAfterType("DVD", !DVD)}} name="dvd" />}
                label="DVDs"/>
            <FormControlLabel
                control={<Checkbox checked={CD} onChange={()=> {setCD(!CD); filterProductsAfterType("CD", !CD)}} name="cd" />}
                label="CDs"/>             
        </div>
        <h4>Period of publication:</h4>
        <YearRangePicker
            minYear={new Date().getFullYear() - 100}
            maxYear={new Date().getFullYear() + 0}
            onSelect={(startYear: number, endYear: number) => {filterProductsAfterPeriod(startYear, endYear)}}
            startYear={beginYear}
            endYear={endYear}/>
    </div>
  )
}

export default Filters

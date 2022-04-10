import { makeStyles, Button } from '@material-ui/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IBorrow } from '../interfaces/products';
import ApiServices from '../services/apiServices';

const useStyle = makeStyles(() => ({
    bodyTable: {
        overflow: 'auto'
    },
    headerTable: {
        backgroundColor: '#ddbea9',
    },
    borrowButton: {
        backgroundColor: '#cb997e',
        width: '120px',
        color: 'white',
        height: '25px'
    },
    returnButton: {
        backgroundColor: '#9b2226',
        width: '120px',
        color: 'white',
        height: '25px'
    }
}))

export const Borrows = () => {
    const classes = useStyle();
    const{getAllBorrows, updateBorrow} = ApiServices();
    const[borrows, setBorrows] = useState<IBorrow[]>([])
    const [loading, setLoading] = useState(false);

    async function getBorrowsData(){
        setLoading(true);
        var r = await getAllBorrows();
        setBorrows(r);
        setLoading(false);
    }

    async function updateBorrowData(borrowId: number, type: string) {
        await updateBorrow(borrowId, type);
        getBorrowsData();
    }

    useEffect(() =>{
        getBorrowsData();
    },[])

  return (
    <div>
        <h2>Borrowed and reserved products</h2><br/>
        {loading ? <div className="loader"></div> : <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1200 }} size="small" aria-label="a dense table">
                <TableHead className={classes.headerTable}>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Client Email</TableCell>
                    <TableCell>Reserved Date</TableCell>
                    <TableCell>Borrow Date</TableCell>
                    <TableCell>Return Date</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody className={classes.bodyTable}>
                {borrows.map((b, key) => (
                    <TableRow
                    key={key + 1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">{key + 1}</TableCell>
                    <TableCell component="th" scope="row">{b.productName}</TableCell>
                    <TableCell>{b.clientEmail}</TableCell>
                    <TableCell>{b.reservedDate != null ? new Date(b.reservedDate).toDateString() : <></>}</TableCell>
                    <TableCell>{b.borrowDate != null ? new Date(b.borrowDate).toDateString() : <></>}</TableCell>
                    <TableCell>{b.returnDate != null ? new Date(b.returnDate).toDateString() : <></>}</TableCell>
                    <TableCell align="center"><Button disabled={b.borrowDate != null} className={classes.borrowButton} onClick={() => updateBorrowData(b.id, "borrow")}>borrow</Button></TableCell>
                    <TableCell align="center" ><Button disabled={b.returnDate != null || b.borrowDate == null} className={classes.returnButton} onClick={() => updateBorrowData(b.id, "return")}>return</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>}
    </div>
  )
}

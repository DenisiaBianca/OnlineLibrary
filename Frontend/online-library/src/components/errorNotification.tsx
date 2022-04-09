import { makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@mui/material'
import { MDBAlert, MDBContainer } from 'mdbreact'
import React, { useEffect, useState } from 'react'

interface IProps{
    message: string
}
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

export const ErrorNotification : React.FC<IProps> = ({message}) => {
    const classes = useStyle();
    const [open, setOpen] = useState(true)

    const notificationHandleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        } 
        setOpen(false)
    };

    useEffect(() => {
        console.log("notif");
    },[])
  return (
    <div>
        <Snackbar open={open} autoHideDuration={4000} onClose={notificationHandleClose}  anchorOrigin={{vertical:"top", horizontal:"right"}}>
            <Alert severity="error">
                {message}
            </Alert>
        </Snackbar>
    </div>
  )
}

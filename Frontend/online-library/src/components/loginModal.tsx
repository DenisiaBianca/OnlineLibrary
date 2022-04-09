import { Box, Button, makeStyles, Modal } from '@material-ui/core'
import { TextField } from '@mui/material';
import React, { useState } from 'react'
import apiServices from '../services/apiServices';
import { generateGUID } from '../services/functions';
import { ErrorNotification } from './errorNotification';

interface IProps {
    open: boolean;
    setOpen: any;
    refreshList: any;
}

const useStyle = makeStyles(() => ({
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '340px',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        textAlign: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        height: '70%',
        padding: '10%'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 'auto'
    },
    cancelButton: {
        backgroundColor: '#9a8c98',
        width: '160px',
        color: 'white'
    },
    saveButton: {
        backgroundColor: '#6b705c',
        width: '160px',
        color: 'white'
    }
}));

const LoginModal: React.FC<IProps> = ({setOpen, open, refreshList}) => {
    const classes = useStyle();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {login} = apiServices();


    async function loginUser()
    {   
        var response = await login(email, password);
        if(response == "error"){
            setError(true);
        }
        else{
            setOpen(false);
            setLoading(true);
            setEmail("");
            setPassword("");
            refreshList(generateGUID());
            setLoading(false);
        }
        setTimeout(() => setError(false), 4000);
    }

  return (
    <div>
        {loading ? <div className="loader"></div> : <></>}
        {error && <ErrorNotification message="Email or password is incorrect!"/>}
        <Modal
            open={open}
            onClose={() => setOpen(false)}>
            <Box className={classes.box}>
                <div className={classes.content}>
                    <div>LOGIN</div><br/>
                    <TextField 
                        sx={{ m: '1%', minWidth: '300px' }}
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <TextField 
                        sx={{ m: '1%', minWidth: '300px' }}
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <div className={classes.buttons}>
                        <Button className={classes.cancelButton} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button className={classes.saveButton} onClick={() => loginUser()}>Login</Button>
                    </div>  
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default LoginModal;
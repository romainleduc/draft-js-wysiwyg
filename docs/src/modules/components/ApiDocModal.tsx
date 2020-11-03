import React, { useState } from 'react';
import {
    ModalProps,
    Modal,
    Button,
    makeStyles,
    Paper,
    Typography,
    IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

interface ApiDocModalProps extends Omit<ModalProps, 'open' | 'onClose'> {
    title: string;
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        // marginLeft: 100,
    },
    paper: {
        maxWidth: 950,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(4, 4, 4),
    },
    content: {
        padding: theme.spacing(0, 4, 3),
        overflow: 'auto',
        height: 625,
        width: '100%',
    },
}));

const ApiDocModal = ({
    title,
    children,
    ...other
}: ApiDocModalProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button color="primary" variant="outlined" onClick={handleOpen}>
                Show Api
            </Button>
            <Modal
                className={classes.modal}
                open={open}
                {...other}
                onClose={handleClose}
            >
                <Paper className={classes.paper}>
                    <div className={classes.header}>
                        <Typography variant="h4">{title}</Typography>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className={classes.content}>{children}</div>
                </Paper>
            </Modal>
        </>
    );
};

export default ApiDocModal;

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {userSelector} from "../../reducers/auth/AuthSlice";
import {fetchEmails, createEmail, emailsSelector, resetEmailsState} from "../../reducers/emails/EmailsSlice";
import {
    AppBar,
    Backdrop,
    Box,
    Button, CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import CreateEmailModal from "./CreateEmailModal";
import {Pagination} from '@mui/material';
import {ITEMS_PER_PAGE, ROUTES} from "../../constants/Constants";

const Dashboard = () => {
    const history = useNavigate();
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const dispatch = useDispatch();
    const {isFetching, sender, email, username} = useSelector(userSelector);
    const {emails, count} = useSelector(emailsSelector);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchEmails({limit: ITEMS_PER_PAGE, offset: (currentPage - 1) * ITEMS_PER_PAGE}));
    }, [currentPage, dispatch]);

    useEffect(() => {
        dispatch(resetEmailsState())
    }, [dispatch, emails]);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        history(ROUTES.LOGIN);
    };

    const handleOpenEmailModal = () => {
        setOpenEmailModal(true);
    }

    const handleCloseEmailModal = () => {
        setOpenEmailModal(false);
    }

    const handleSendEmail = (data) => {
        dispatch(createEmail({
            emailData: {
                subject: data.subject,
                recipient: data.recipient,
                message: data.message,
                sender: sender
            }
        })).then(() => {
            dispatch(fetchEmails({limit: ITEMS_PER_PAGE, offset: (currentPage - 1) * ITEMS_PER_PAGE}));
        });
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isFetching}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <CreateEmailModal
                open={openEmailModal}
                handleClose={handleCloseEmailModal}
                handleSend={handleSendEmail}
            />
            <AppBar sx={{height: '50px'}} position="static">
                <Button
                    variant="contained"
                    sx={{ml: 'auto', mt: '5px', mr: '5px'}}
                    onClick={handleLogOut}
                >
                    Log Out
                </Button>
            </AppBar>

            <Box sx={{pt: '20px', width: '90vw', m: 'auto'}}>
                <Typography variant="h4" sx={{mb: '20px'}}>
                    Current User {username} with email {email}
                </Typography>
                <Button
                    variant="contained"
                    sx={{mb: '20px'}}
                    onClick={() => handleOpenEmailModal()}
                >
                    Send Email
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                Recipient
                            </TableCell>
                            <TableCell>
                                Subject
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emails.map((email) => (
                            <TableRow key={email.id}>
                                <TableCell>
                                    {email.id}
                                </TableCell>
                                <TableCell>
                                    {email.recipient}
                                </TableCell>
                                <TableCell>
                                    {email.subject}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                    <Pagination
                        count={Math.ceil(count / ITEMS_PER_PAGE)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </Box>
            </Box>
        </>
    )
}

export default Dashboard;
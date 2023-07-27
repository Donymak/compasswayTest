import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Controller, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {emailsSelector, resetEmailsState} from "../../reducers/emails/EmailsSlice";
import {useDispatch} from 'react-redux';

const CreateEmailModal = ({open, handleClose, handleSend}) => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const { register, control, reset, formState: { errors }, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { isSuccess } = useSelector(emailsSelector);

    useEffect(() => {
        if (isSuccess) {
            reset({ recipient: '', subject: '', message: '' });
            setRecipient('');
            setSubject('');
            dispatch(resetEmailsState())
            handleClose();
        }
    }, [isSuccess, dispatch, reset, handleClose]);

    const handleRecipientChange = (event) => {
        setRecipient(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleSendClick = (data) => {
        handleSend(data);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Send Email</DialogTitle>
            <form onSubmit={handleSubmit(handleSendClick)}>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Recipient"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={recipient}
                        {...register('recipient', {
                            required: 'Recipient email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        error={Boolean(errors.recipient)}
                        helperText={errors.recipient?.message}
                        onChange={handleRecipientChange}
                    />
                    <TextField
                        margin="dense"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={subject}
                        {...register('subject', {required: 'Subject is required'})}
                        error={Boolean(errors.subject)}
                        helperText={errors.subject?.message}
                        onChange={handleSubjectChange}
                    />
                    <Controller
                        name="message"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Message is required',
                            maxLength: {
                                value: 5000,
                                message: 'Message must be less than 5000 characters'
                            }
                        }}
                        render={({field}) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.message && <p>{errors.message.message}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Send</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateEmailModal;
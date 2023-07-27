import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearState, signupUser, userSelector } from "../../reducers/auth/AuthSlice";
import { Card, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {ROUTES} from "../../constants/Constants";

const SignUp = () => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const history = useNavigate();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        dispatch(signupUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            history(ROUTES.DASHBOARD);
        }

        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isSuccess, isError, dispatch, history, errorMessage]);

    return (
        <>
            <Card sx={{
                maxWidth: '350px',
                margin: 'auto',
                p: '50px 20px',
                marginTop: '100px',
                boxShadow: '0px 0px 10px #ccc',
                borderRadius: '10px',
                backgroundColor: '#f6f6f6'
            }}>
                <Typography sx={{mb: '20px'}} variant="h5">
                    Sign Up to your account
                </Typography>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="username"
                            name="username"
                            type="text"
                            label="Username"
                            sx={{mb: '20px', width: '250px'}}
                            {...register('username', {
                                required: 'Name is required',
                                pattern: {
                                    value: /^[\w.@+-]+$/,
                                    message: 'Username can only contain latin letters, digits and @/./+/-/_ characters.'
                                }
                            })}
                            autoComplete="name"
                            error={Boolean(errors.usernaame)}
                            helperText={errors.usernaame?.message}
                        />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            sx={{mb: '20px', width: '250px'}}
                            autoComplete="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            sx={{mb: '20px', width: '250px'}}
                            {...register('password', {required: 'Password is required'})}
                            autoComplete="current-password"
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div>
                            <LoadingButton loading={isFetching} type="submit">
                                Sign up
                            </LoadingButton>
                        </div>
                    </form>
                    <div>
                        <span>
                            Or <Link to="/login"> Login</Link>
                        </span>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default SignUp;
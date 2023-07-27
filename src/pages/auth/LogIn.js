import React, {useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {clearState, fetchUser, loginUser, userSelector} from "../../reducers/auth/AuthSlice";
import {Card, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ROUTES} from "../../constants/Constants";

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(userSelector);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState());
            navigate(ROUTES.DASHBOARD);
        }
    }, [dispatch, errorMessage, navigate, isError, isSuccess]);

    const authenticateUser = useCallback(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authenticateUser();
        }
    }, [navigate, authenticateUser]);

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
                    Sign In to your account
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
                                required: 'Username is required',
                                pattern: {
                                    value: /^[\w.@+-]+$/,
                                    message: 'Username can only contain latin letters, digits and @/./+/-/_ characters.'
                                }
                            })}
                            autoComplete="username"
                            error={Boolean(errors.username)}
                            helperText={errors.username?.message}
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
                                Sign in
                            </LoadingButton>
                        </div>
                    </form>
                    <div>
                        <span>
                            Or <Link to="/signup"> Signup</Link>
                        </span>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default LogIn;
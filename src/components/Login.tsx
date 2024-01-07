import {FC, useEffect} from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import Text from "../service-components/Text/Text";
import {useFormik} from "formik";
import {withFormikDevtools} from "formik-devtools-extension";
import {useStore} from "../hooks/useStore";
import {authApp, authMe} from "../store/async-thunks/auth-thunks/authApp";
import {useNavigate} from "react-router-dom";

const Login: FC = () => {
    const {dispatch, useAppSelector} = useStore()
    const navigate = useNavigate()
    const {isAuth, isLogging} = useAppSelector(state => state.auth)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email.length) {
                return {
                    email: 'Email is required'
                }
            }

            if (!values.password.length) {
                return {
                    password: 'Password is required'
                }
            }


        },
        initialValues: {
            email: '',
            password: '',
            remember: true
        },

        onSubmit: ({email, password, remember}) => {
            dispatch(authApp({remember, email, password}))
        },
    });

    withFormikDevtools(formik)


    useEffect(() => {
        if (isAuth) {
            navigate('/', {replace: true})
        }
    }, [isAuth])


    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl style={{width: '100%'}}>
                        <FormLabel>
                            <Text>
                                Use test credentials - <br/>
                                Email - free@samuraijs.com <br/>
                                Password - free
                            </Text>
                        </FormLabel>

                        <FormGroup>


                            <TextField
                                label={'Email'}
                                margin={'normal'}
                                type={'email'}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <Text _color={'crimson'}>{formik.errors.email}</Text> : null}

                            <TextField
                                {...formik.getFieldProps('password')}
                                type={'password'}
                                label={'Password'}
                                margin={'normal'}
                            />
                            {formik.errors.password ? <Text _color={'crimson'}>{formik.errors.password}</Text> : null}

                            <FormControlLabel
                                control={<Checkbox
                                    checked={formik.values.remember} {...formik.getFieldProps('remember')} />}
                                label={'Remember me'}
                            />

                            <Button color={'primary'} variant={'contained'}
                                    type={'submit'}>{isLogging ? 'Logging in...' : 'Log in'}</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>

        </Grid>
    )
}
export default Login
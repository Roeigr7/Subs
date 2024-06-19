// @ts-nocheck
import * as React from 'react';
// @ts-nocheck
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'components/core/link';
import { DynamicLogo } from 'components/core/logo';
import { useAuth } from 'contexts/auth/custom/user-context';
import { paths } from 'paths';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

('use client');

const oAuthProviders = [{ id: 'google', name: 'גוגל', logo: '/assets/logo-google.svg' }];

const schema = zod.object({
  email: zod.string().min(1, { message: 'הכנס כתובת דוא"ל' }).email(),
  password: zod.string().min(6, { message: 'סיסמא צריכה להכיל לפחות 6 תווים' }),
  terms: zod.boolean().refine((value) => value, 'נא לאשר את התנאים'),
});

const defaultValues = { firstName: '', lastName: '', email: '', password: '', terms: false };

export function SignUpForm() {
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const handleProviderAuth = React.useCallback(async (provider) => {
    setIsPending(true);
    try {
      setIsPending(true);
      setError('root', { type: 'server', message: '' });
      await googleLogin();
      navigate('/');
    } catch (err) {
      setError('root', { type: 'server', message: err });
      setIsPending(false);
      return;
    }
  }, []);
  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);
      console.log('22');
      try {
        setIsPending(true);
        setError('root', { type: 'server', message: '' });

        await signup(values.email, values.password);
      } catch (err) {
        console.error('err', err);
        setError('root', { type: 'server', message: err });
      }
      setIsPending(false);
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      <div>
        <Box
          component={RouterLink}
          // @ts-ignore
          href={paths.home}
          sx={{ display: 'inline-block', fontSize: 0 }}
        >
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Stack spacing={1}>
        <Typography variant="h5">הירשם</Typography>
        <Typography color="text.secondary" variant="body2">
          כבר יש לך משתמש?{' '}
          <Link component={RouterLink} href={paths.auth.custom.signIn} variant="subtitle2">
            התחבר
          </Link>
        </Typography>
      </Stack>
      <Stack spacing={3}>
        <Stack spacing={2}>
          {oAuthProviders.map((provider) => (
            <Button
              color="secondary"
              disabled={isPending}
              endIcon={<Box alt="" component="img" height={24} src={provider.logo} width={24} />}
              key={provider.id}
              onClick={() => handleProviderAuth(provider.id)}
              variant="outlined"
            >
              המשך עם {provider.name}
            </Button>
          ))}
        </Stack>
        <Divider>או</Divider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <InputLabel>אימייל</InputLabel>
                  <OutlinedInput {...field} type="email" />
                  {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>סיסמא</InputLabel>
                  <OutlinedInput {...field} type="password" />
                  {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <div>
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={
                      <React.Fragment>
                        קראתי את <Link>התנאים</Link>
                      </React.Fragment>
                    }
                  />
                  {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
                </div>
              )}
            />
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <LoadingButton loading={isPending} disabled={isPending} type="submit" variant="contained">
              הירשם
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
      <Alert color="warning">Created users are not persisted</Alert>
    </Stack>
  );
}

// @ts-nocheck
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { RouterLink } from 'components/core/link';
import { DynamicLogo } from 'components/core/logo';
import { toast } from 'components/core/toaster';
import { useAuth } from 'contexts/auth/custom/user-context';
import { authClient } from 'lib/auth/custom/client';
import { paths } from 'paths';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

('use client');

const oAuthProviders = [{ id: 'google', name: 'גוגל', logo: '/assets/logo-google.svg' }];

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

const defaultValues = { email: '', password: '' };

export function SignInForm() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

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
      try {
        setIsPending(true);
        setError('root', { type: 'server', message: '' });
        await login(values.email, values.password);
        navigate('/');
      } catch (err) {
        setError('root', { type: 'server', message: err });
        setIsPending(false);
        return;
      }
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Stack spacing={1}>
        <Typography variant="h5">התחבר</Typography>
        <Typography color="text.secondary" variant="body2">
          עוד אין לך משתמש?{' '}
          <Link component={RouterLink} href={paths.auth.custom.signUp} variant="subtitle2">
            הירשם
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
        <Stack spacing={2}>
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
                    <OutlinedInput
                      {...field}
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={() => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={() => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
              <Button disabled={isPending} type="submit" variant="contained">
                התחבר
              </Button>
            </Stack>
          </form>
          <div>
            <Link component={RouterLink} href={paths.auth.custom.resetPassword} variant="subtitle2">
              שכחת סיסמא?
            </Link>
          </div>
        </Stack>
      </Stack>
      <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert>
    </Stack>
  );
}

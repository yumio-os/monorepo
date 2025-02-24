import { Component, createEffect, createSignal } from 'solid-js';

import { useApollo } from '../../providers/apollo/Apollo';
import {
  AuthOtpDocument,
  AuthOtpMutation,
  AuthOtpMutationVariables,
  AuthPasswordDocument,
  AuthPasswordMutation,
  AuthPasswordMutationVariables,
  SendOtpDocument,
  SendOtpMutation,
  SendOtpMutationVariables,
} from '../../providers/apollo/gql';
import { useAuth } from '../../providers/auth/Auth';
import styles from './Auth.module.css';

const Auth: Component = () => {
  const { authState, setAuthState } = useAuth();
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [authLoading, setAuthLoading] = createSignal(false);
  const [otpReqSent, setOtpReqSent] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal('');
  const [otp, setOtp] = createSignal<string | null>(null);

  const client = useApollo();
  createEffect(() => {
    setErrorMessage(null);
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));

    const otpUrl = params.get('otp');
    if (otpUrl && !otp()) {
      setOtp(otpUrl);

      params.delete('otp');

      client
        .mutate<AuthOtpMutation, AuthOtpMutationVariables>({
          mutation: AuthOtpDocument,
          variables: {
            code: otpUrl,
          },
        })
        .then((response) => {
          if (response?.data?.authOtp) {
            const { bearer, decoded } = response.data.authOtp;
            setAuthState({ bearer, user: decoded, isAuthenticated: true } as any);
            setErrorMessage(null);
          } else {
            //   setErrorMessage('Can not send OTP link');
          }
        })
        .catch((err) => {
          setErrorMessage('Failed to login with otp');
        })
        .finally(() => {
          const newHash = params.toString() ? `#${params.toString()}` : '';
          window.history.replaceState(null, '', `${window.location.pathname}${newHash}`);
        });
    }
  });

  const handleLoginOtp = (e: Event) => {
    setAuthLoading(true);
    setErrorMessage(null);
    e.preventDefault();

    if (!email() || email() == '') {
      setAuthLoading(false);
      return setErrorMessage('Provide Email');
    }

    client
      .mutate<SendOtpMutation, SendOtpMutationVariables>({
        mutation: SendOtpDocument,
        variables: {
          email: email(),
        },
      })
      .then((response) => {
        if (response?.data?.sendOTP) {
          setOtpReqSent(true);
          setErrorMessage(''); // Clear any previous error message
        } else {
          setErrorMessage('Can not send OTP link');
        }
      })
      .catch((err) => {
        setErrorMessage('Can not send OTP link');
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const handleLogin = (e: Event) => {
    setAuthLoading(true);
    e.preventDefault();

    if (!email() || email() == '') {
      setAuthLoading(false);
      return setErrorMessage('Provide Email');
    }

    if (!password() || password() == '') {
      setAuthLoading(false);
      return setErrorMessage('Provide Password');
    }

    client
      .mutate<AuthPasswordMutation, AuthPasswordMutationVariables>({
        mutation: AuthPasswordDocument,
        variables: {
          email: email(),
          password: password(),
        },
      })
      .then((response) => {
        if (response?.data?.authPassword?.bearer) {
          const { bearer, decoded } = response.data.authPassword;
          setAuthState({ bearer, user: decoded, isAuthenticated: true } as any);
          setErrorMessage(''); // Clear any previous error message
        } else {
          setErrorMessage('Invalid email or password.');
        }
      })
      .catch((err) => {
        setErrorMessage('Invalid email or password.');
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  return (
    <div class={`d-flex ${styles.authContainer}`}>
      {!otpReqSent() ? (
        <>
          <div class={`card p-4 ${styles.authCard}`}>
            <h2 class="text-center">Login</h2>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </div>
            {errorMessage() && <p class="text-danger">{errorMessage()}</p>}
            <button
              type="submit"
              class="btn btn-primary w-100 my-1"
              onClick={handleLogin}
              disabled={authLoading() || !email() || !password()}
            >
              {authLoading() ? (
                <>
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Login with password ...
                </>
              ) : (
                'Login with password'
              )}
            </button>
            <button type="submit" class="btn btn-primary w-100" onClick={handleLoginOtp} disabled={authLoading() || !email()}>
              {authLoading() ? (
                <>
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Send OTP Link ...
                </>
              ) : (
                'Send OTP Link'
              )}
            </button>
          </div>
        </>
      ) : (
        <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
          <div class="text-success display-1">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <p class="mt-3 fs-4 text-center">Please check your inbox</p>
        </div>
      )}
    </div>
  );
};

export default Auth;

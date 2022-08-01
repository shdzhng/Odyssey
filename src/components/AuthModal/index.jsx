import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Input,
} from '@mui/material';
import { ModalContainer, ModalTextField } from './authModal.styles';
import { useAuth } from '../../firebaseAuth/firebase';

function AuthModal() {
  const [open, setOpen] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formError, setFormError] = useState({});

  const [authMode, setAuthMode] = useState('signIn'); //example: sign in, sign up, reset password

  const messageMap = {
    signUp: 'Register Your Account',
    signIn: 'Welcome Back :)',
    forgotPassword: "No worries, let' fix it :)",
  };

  const {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  } = useAuth();

  useEffect(() => {
    if (!currentUser) setOpen(true);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setOpen(false);
      setAuthMode('signIn');
    } else {
      setOpen(true);
    }
  }, [currentUser]);

  ///
  useEffect(() => {
    console.log(authMode);
  }, [authMode]);

  ///

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateForm = () => {
    let isValid = true;

    if (firstName.length === 0) {
      isValid = false;
      setFormError((errors) => ({
        ...errors,
        ['firstName']: 'first name cannot be empty',
      }));
    }

    if (lastName.length === 0) {
      isValid = false;
      setFormError((errors) => ({
        ...errors,
        ['lastName']: 'last name cannot be empty',
      }));
    }

    if (email.length === 0) {
      isValid = false;
      setFormError((errors) => ({
        ...errors,
        ['email']: 'email cannot be empty',
      }));
    } else if (!email.includes('@')) {
      isValid = false;
      setFormError((errors) => ({
        ...errors,
        ['email']: 'please enter a valid email',
      }));
    }

    if (!password.length || !passwordConfirm.length) {
      isValid = false;
      setFormError((errors) => ({
        ...errors,
        ['password']: 'passwords cannot be empty',
      }));
    } else if (password !== passwordConfirm) {
      isValid = false;
      setFormError((errors) => ({
        ...errors,
        ['password']: 'passwords do not match',
      }));
    }

    return isValid;
  };

  const handleSignOut = () => {
    logout();
  };

  const handleSignUp = () => {
    if (authMode !== 'signUp') {
      setAuthMode('signUp');
    } else if (validateForm() === true) {
      signup(email, password, firstName, lastName);
      setFormError({});
      setPassword('');
      setPasswordConfirm('');
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  };

  const handleForgotPassword = () => {
    if (authMode !== 'forgotPassword') {
      setAuthMode('forgotPassword');
    } else {
      resetPassword(email);
    }
  };

  const handleSignIn = () => {
    if (authMode !== 'signIn') {
      setAuthMode('signIn');
    } else {
      login(email, password);
    }
  };

  return (
    <div>
      {currentUser ? (
        <Button onClick={handleSignOut}> Sign Out</Button>
      ) : (
        <Button onClick={handleOpen}>Open modal</Button>
      )}

      <Modal open={open} onClose={handleClose}>
        <ModalContainer sx={{ boxShadow: 10 }}>
          <Typography>{messageMap[authMode]}</Typography>

          {authMode === 'signUp' ? (
            <>
              <ModalTextField
                required
                value={firstName}
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                error={formError['firstName']}
                helperText={
                  formError['firstName'] ? formError['firstName'] : false
                }
              ></ModalTextField>
              <ModalTextField
                required
                value={lastName}
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                error={formError['lastName']}
                helperText={
                  formError['lastName'] ? formError['lastName'] : false
                }
              ></ModalTextField>
            </>
          ) : null}

          <ModalTextField
            required
            value={email}
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            error={formError['email']}
            helperText={formError['password'] ? formError['email'] : false}
          ></ModalTextField>

          {authMode !== 'forgotPassword' ? (
            <ModalTextField
              required
              value={password}
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={formError['password'] ? formError['password'] : false}
            ></ModalTextField>
          ) : null}

          {authMode === 'signUp' ? (
            <ModalTextField
              required
              value={passwordConfirm}
              type="password"
              label="Password Confirmation"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={formError['password'] ? true : false}
              helperText={formError['password'] ? formError['password'] : false}
            ></ModalTextField>
          ) : null}

          <Button onClick={handleSignUp}>Sign Up</Button>
          <Button onClick={handleSignIn}>Sign In</Button>
          <Button onClick={handleForgotPassword}>Forgot Password</Button>
        </ModalContainer>
      </Modal>
    </div>
  );
}

export default AuthModal;

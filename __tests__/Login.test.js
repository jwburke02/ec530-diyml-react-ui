import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../src/components/modals/Login';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('Logn modal', () => {
  test('Renders correctly when accessed', () => {
    const onClose = () => {};
    const setApiToken = () => {};
    const setUsername = () => {};

    const {getByText} = render(
        <BrowserRouter>
            <Login onClose={onClose} setApiToken={setApiToken} setUsername={setUsername} />
        </BrowserRouter>
    );

    const header = getByText("Log In to EC530 DIYML")
    const cancel = getByText("Cancel")
    const login = getByText("Log In")

    expect(header).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });
});
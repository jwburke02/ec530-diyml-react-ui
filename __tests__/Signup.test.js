import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Signup from '../src/components/modals/Signup';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('Signup modal', () => {
  test('Renders correctly when accessed', () => {
    const onClose = () => {};
    const setApiToken = () => {};
    const setUsername = () => {};

    const {getByText} = render(
        <BrowserRouter>
            <Signup onClose={onClose} setApiToken={setApiToken} setUsername={setUsername} />
        </BrowserRouter>
    );

    const header = getByText("Sign Up for EC530 DIYML")
    const cancel = getByText("Cancel")
    const signup = getByText("Sign Up")

    expect(header).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
    expect(signup).toBeInTheDocument();
  });
});
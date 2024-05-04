// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../src/components/Home';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('Home component', () => {
  test('Renders correctly when not authed', () => {
    const username = null;
    const apiToken = null;
    const setUsername = () => {};
    const setApiToken = () => {};


    const {getByText} = render(
        <BrowserRouter>
            <Home username={username} apiToken={apiToken} setApiToken={setApiToken} setUsername={setUsername} />
        </BrowserRouter>
    );
    const logIn = getByText("Log In")
    const signUp = getByText("Create Profile")

    expect(logIn).toBeInTheDocument();
    expect(signUp).toBeInTheDocument();
  });
  test('Renders correctly when authed', () => {
    const username = "ExampleUsername";
    const apiToken = "ExampleAPIToken";
    const setUsername = () => {};
    const setApiToken = () => {};


    const {getByText} = render(
        <BrowserRouter>
            <Home username={username} apiToken={apiToken} setApiToken={setApiToken} setUsername={setUsername} />
        </BrowserRouter>
    );

    const heading = getByText("Welcome to EC530 DIYML, ExampleUsername")
    const dashButton = getByText("Dashboard")
    const subHeading = getByText("Or Search for a User's Published Projects")
    const searchButton = getByText("Search")

    expect(heading).toBeInTheDocument();
    expect(dashButton).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from '../src/components/Dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('Dashboard component', () => {
  test('Renders correctly with no projects available', () => {
    const username = "User";
    const apiToken = "API";

    const {getByText} = render(
        <BrowserRouter>
            <Dashboard username={username} apiToken={apiToken} />
        </BrowserRouter>
    );
    
    Dashboard.prototype.fetchDataAsync = jest.fn();

    const goBack = getByText("Go Back")
    const createProject = getByText("Create new project")
    const title = getByText("User's Projects")

    expect(goBack).toBeInTheDocument();
    expect(createProject).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
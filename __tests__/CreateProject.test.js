import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateProject from '../src/components/CreateProject/CreateProject';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('CreateProject component', () => {
  test('Renders correctly', () => {
    const apiToken = "APITOKEN";
    const {getByText} = render(
        <BrowserRouter>
            <CreateProject apiToken={apiToken} />
        </BrowserRouter>
    );
    const name = getByText("Project Name")
    const type = getByText("Project Type")
    const classification = getByText("Classification")
    const detection = getByText("Object Detection")
    const cancel = getByText("Cancel")
    const createProject = getByText("Create Project")

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(classification).toBeInTheDocument();
    expect(detection).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
    expect(createProject).toBeInTheDocument();
  });
});
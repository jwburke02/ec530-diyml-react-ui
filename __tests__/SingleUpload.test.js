import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddData from '../src/components/AddData/AddData';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('AddData component', () => {
  test('Renders correctly', () => {
    const apiToken = "API";

    const {getByText} = render(
        <BrowserRouter>
            <AddData apiToken={apiToken} />
        </BrowserRouter>
    );

    const message = getByText("Adding a Singular Data Point");
    const buttonSwitch = getByText("(Enter More)");
    const inputPrompt = getByText("Input an image file:");
    const labelPrompt = getByText("Enter label information with no spaces, seperated by the '|' character");
    const cancel = getByText("Cancel");
    const save = getByText("Save");

    expect(message).toBeInTheDocument();
    expect(buttonSwitch).toBeInTheDocument();
    expect(inputPrompt).toBeInTheDocument();
    expect(labelPrompt).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
    expect(save).toBeInTheDocument();
  });
});
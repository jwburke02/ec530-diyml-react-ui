import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddDatas from '../src/components/AddData/AddDatas';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('AddDatas component', () => {
  test('Renders correctly', () => {
    const apiToken = "API";

    const {getByText} = render(
        <BrowserRouter>
            <AddDatas apiToken={apiToken} />
        </BrowserRouter>
    );

    const message = getByText("Adding Multiple Data Points");
    const buttonSwitch = getByText("(Enter Single)");
    const inputPrompt = getByText("Input image files:");
    const labelPrompt = getByText("Input corresponding text files:");
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
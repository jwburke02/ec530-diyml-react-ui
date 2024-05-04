import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Inference from '../src/components/Inference/Inference';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('Inference component', () => {
  test('Renders correctly', () => {
    const home = false
    const apiToken = "APITOKEN";
    const {getByText} = render(
        <BrowserRouter>
            <Inference apiToken={apiToken} />
        </BrowserRouter>
    );

    const image_in = getByText("Input an image file:")
    const cancel = getByText("Cancel")
    const infer = getByText("Infer")

    expect(image_in).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
    expect(infer).toBeInTheDocument();
  });
});
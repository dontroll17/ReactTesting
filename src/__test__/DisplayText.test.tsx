import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DisplayText from '../components/DisplayText';
import "@testing-library/jest-dom/";

const testUser = 'testUser';

describe('Test DisplayText', () => {
    it('renders without crashing', () => {
        const { baseElement } = render(<DisplayText />);
        expect(baseElement).toBeInTheDocument();
    });

    it('receives input text', () => {

        const { getByTestId } = render(<DisplayText />);
        const input = getByTestId('user-input');

        fireEvent.change(input, { target: {
            value: testUser
        }});
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(testUser);
    });

    it('shows message', () => {
        const msg = `React testing, ${testUser}`;

        const { getByTestId } = render(<DisplayText />);
        const input = getByTestId('user-input');
        const label = getByTestId('final-msg');

        fireEvent.change(input, { target: {
            value: testUser
        }});

        const btn = getByTestId('input-submit');

        fireEvent.click(btn);

        expect(label).toBeInTheDocument();
        expect(label.innerHTML).toBe(msg);
    });

    it('matches snapshot', () => {
        const { baseElement } = render(<DisplayText />);
        expect(baseElement).toMatchSnapshot();
    })
})
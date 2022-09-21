import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import DisplayText from '../components/DisplayText';
import "@testing-library/jest-dom/";

const testUser = 'testUser';

jest.mock('../__mocks__/UserTodo');
global.fetch = jest.fn();


afterEach(cleanup);

describe('Test DisplayText', () => {

    const getFullNameMock = (username: string): [Promise<string>, jest.Mock<Promise<string>, [string]>] => {
        const promise = new Promise<string>((res, rej) => {
            res(testUser);
        });
        const getFullName = jest.fn(async (username: string): Promise<string> => {
            return promise;
        });

        return [promise, getFullName];
    }


    it('renders without crashing', () => {
        const [promise, getFullName] = getFullNameMock(testUser);

        const { baseElement } = render(<DisplayText getFullName={getFullName}/>);
        expect(baseElement).toBeInTheDocument();
    });

    it('receives input text', () => {
        const [promise, getFullName] = getFullNameMock(testUser);

        const { getByTestId } = render(<DisplayText getFullName={getFullName}/>);
        const input = getByTestId('user-input');

        fireEvent.change(input, { target: {
            value: testUser
        }});
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(testUser);
    });

    it('shows message', async () => {
        const [promise, getFullName] = getFullNameMock(testUser);
        const msg = `React testing, ${testUser}`;

        const { getByTestId } = render(<DisplayText getFullName={getFullName}/>);
        const input = getByTestId('user-input');
        const label = getByTestId('final-msg');

        fireEvent.change(input, { target: {
            value: testUser
        }});

        const btn = getByTestId('input-submit');

        fireEvent.click(btn);

        await waitFor(() => {
            expect(label).toBeInTheDocument();
            expect(label.innerHTML).toBe(msg);
        });
    });

    it('matches snapshot', () => {
        const [promise, getFullName] = getFullNameMock(testUser);
        const { baseElement } = render(<DisplayText getFullName={getFullName}/>);
        expect(baseElement).toMatchSnapshot();
    })
})
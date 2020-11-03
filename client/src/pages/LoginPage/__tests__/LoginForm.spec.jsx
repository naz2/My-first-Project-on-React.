import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import faker from 'faker';
import LoginForm from 'pages/LoginPage/components/LoginForm';

const buildFromData = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})

const submit = jest.fn(() => Promise.resolve())

test('LoginForm should render correct', () => {
render(
    <Router>
        <LoginForm submit={submit} />
    </Router>);
    
    const {email, password} = buildFromData();
    const emailEl = screen.getByLabelText(/email/i);
    const passEl = screen.getByLabelText(/password/i);
    const btnEl = screen.getByText(/login/i);

    fireEvent.change(emailEl, {target: {value: email}});
    fireEvent.change(passEl, {target: {value: password}});

    expect(emailEl).toHaveValue(email);
    expect(passEl).toHaveValue(password);

    fireEvent.click(btnEl);

});


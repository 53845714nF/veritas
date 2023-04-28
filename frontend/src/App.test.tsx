import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";


test('should render the home page', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <Login />
        </MemoryRouter>
    );  
    expect(screen.getByText('Veritas')).toBeInTheDocument();
});


test('should render the Login page', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
});

test('should render the Home page', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Veritas')).toBeInTheDocument();
});
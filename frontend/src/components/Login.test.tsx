import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "./Login";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


beforeEach(() => {
  render(<Login />);
});

test("Renders Login Screen", () => {
    const TitleElement = screen.getByText(/Veritas/i);
    const UsernameLabel = screen.getByText(/Username/i);
    const PasswordLabel = screen.getByText(/Password/i);
    const LoginButton = screen.getByText(/Login/i);
    expect(TitleElement,).toBeInTheDocument();
    expect(UsernameLabel).toBeInTheDocument();
    expect(PasswordLabel).toBeInTheDocument();
    expect(LoginButton).toBeInTheDocument();
});



test("Login Button disabled when Loading", () => {
  const isLoginButtonDisabled = (screen.getByText(/Login/i)as HTMLButtonElement).disabled;
  expect(isLoginButtonDisabled).toBe(false);
})

test("Renders Progress Bar when Loading", () => {
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(() => [true, jest.fn()])
  render(<Login />)
  
  const ProgressElement = screen.getByRole("progressbar");  
  expect(ProgressElement).toBeInTheDocument();
})


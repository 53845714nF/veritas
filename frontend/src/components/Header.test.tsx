import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Header from "./Header";
/*
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("Renders Header", () => {
    render(<Header />);
    const TitleElement = screen.getByText(/Veritas/i);
    expect(TitleElement).toBeInTheDocument();
    const CreateCert = screen.getByText(/Create Cert/i);
    expect(CreateCert).toBeInTheDocument();
    const CreateCa = screen.getByText(/Create CA/i);
    expect(CreateCa).toBeInTheDocument();
    const LogoutButton = screen.getByText(/Logout/i);
    expect(LogoutButton).toBeInTheDocument();
});

test("Click on Logout", () => {
    render(<Header />);
    const LogoutButton = screen.getByText(/Logout/i);
    expect(LogoutButton).toBeInTheDocument();
    LogoutButton.click();
    expect(mockedUsedNavigate).toBeCalledWith('/login');
});
/*
test("test openCaForm", () => {
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(() => [false, jest.fn()])
    render(<Header />);
    const CreateCa = screen.getByText(/Create CA/i);
    expect(CreateCa).toBeInTheDocument();
    CreateCa.click();
    expect(useStateSpy).toBeCalledWith(true);
});

test("test closeCaForm", () => {
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(() => [true, jest.fn()])
    render(<Header />);
    const CreateCa = screen.getByText(/Create CA/i);
    expect(CreateCa).toBeInTheDocument();
    CreateCa.click();
    expect(useStateSpy).toBeCalledWith(false);
});*/
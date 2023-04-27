import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CaTable from "./CaTable";

beforeEach(() => {
    render(<CaTable />);
});

test("data is null", () => {
    expect(screen.getByRole('progress')).toBeInTheDocument();
});

test("data is not null", () => {
});
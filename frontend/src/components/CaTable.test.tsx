import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CaTable from "./CaTable";
import { Record } from "pocketbase";

test("Record data default is null, render progressbar", () => {
    render(<CaTable />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
});

/*
test("Table Header and Columns", () => {
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(() => [{ items: [{ id: 'test', collectionId: 'certificationauthority', collectionName: "certification_authority", $load:()=>{}, }] } as Record , jest.fn()])
    render(<CaTable />);
    
    const TableHeader = screen.getByRole('table');
    expect(TableHeader).toBeInTheDocument();
    const name = screen.getByText('Name');
    expect(name).toBeInTheDocument();
    const caFile = screen.getByText('CA File');
    expect(caFile).toBeInTheDocument();
    const cname = screen.getByText('Cname');
    expect(cname).toBeInTheDocument();
    const days = screen.getByText('Days');
    expect(days).toBeInTheDocument();
    const email = screen.getByText('E-Mail');
    expect(email).toBeInTheDocument();
    const country = screen.getByText('Country');
    expect(country).toBeInTheDocument();
    const state = screen.getByText('State');
    expect(state).toBeInTheDocument();
    const locality = screen.getByText('Locality');
    expect(locality).toBeInTheDocument();
    const orgName = screen.getByText('Organisation Name');
    expect(orgName).toBeInTheDocument();
    const orgUnit = screen.getByText('Unit');
    expect(orgUnit).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
});*/
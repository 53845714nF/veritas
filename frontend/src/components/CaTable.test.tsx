import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CaTable from "./CaTable";

test.skip("Record data default is null, render progressbar", () => {
    render(<CaTable />);
    const progress = screen.getByRole("progressbar");
    
    expect(progress).toBeInTheDocument();
});

const obj = {items:[
    {
        caFile: "test.pem",
        cname: "test.com",
        collectionId: "certificationauthority",
        collectionName: "certification_authority",
        country: "DE",
        created: "2023-05-15 14:14:09.802Z",
        days: 200,
        email: "test@foo.com",
        id: "test",
        locality: "ber",
        orgName: "test",
        orgUnit: "uit",
        state: "ber",
        updated: "2023-05-15 14:14:09.802Z",
        expand: {}
      }
]};

test("Table Header and Columns", () => {
    // const useStateSpy = jest.spyOn(React, 'useState')
    // const setterMock = jest.fn()
    // const x = useStateSpy.mockImplementation(() => [obj, setterMock])
    // console.log(x)
    render(<CaTable/>);

    const TableHeader = screen.getByRole('table');
    
    expect(TableHeader).toBeInTheDocument();
   // const testcom = screen.getByText('test.com');
    //expect(testcom).toBeInTheDocument();
});

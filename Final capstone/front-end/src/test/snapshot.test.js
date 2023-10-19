import React from "react";
import renderer from 'react-test-renderer'
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// snapshot test created of App.js
it('Snapshot of App.js', ()=> {
    const tree = renderer.create(
        <MemoryRouter>
            <App/>
        </MemoryRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()
}) 

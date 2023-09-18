import React from "react";
import { Sidebar } from './Sidebar';

export default {
    title: "Sidebar",
    component: Sidebar,
    argTypes: {
        type: {
            control: "select",
            defaultValue: "default",
        },
    },
};

export const Default = (args) => <Sidebar {... args}/>;
Default.args = {
    title: "Sidebar Example",
    message: "Lorem ipsum",
}
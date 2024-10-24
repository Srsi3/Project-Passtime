import React from "react";
import { BrowserRouter } from "react-router-dom";
import Quote from "./Quote"; // Import the Quote component

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Quote />
        </BrowserRouter>
    );
}

export default App;

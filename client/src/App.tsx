import React from 'react';
import TestComponent, { resources } from './resources/TestComponent';

function App() {
    // return <Navbar />;
    return <TestComponent resource={resources['azurerm_resource_group']} />;
}

export default App;

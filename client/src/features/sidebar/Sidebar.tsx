import { useState } from 'react';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    if (!open) {
        return null;
    }

    return (
        <div className="w-1/3 border-l-2 p-2">
            <h1 className="text-2xl">Sidebar</h1>
            <h2>Resource Info</h2>
            <h2>Resource Description/Info</h2>
            <h2>Checklist of commonly used subresources</h2>
            <button onClick={() => setOpen(false)}>Close</button>
        </div>
    );
};

export default Sidebar;

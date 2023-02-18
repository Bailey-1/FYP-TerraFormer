import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const SidebarComponent = () => {
    const [open, setOpen] = useState(true);

    const selectedResource = useSelector((state: RootState) =>
        state.flow.nodes.find((x) => x.selected),
    );

    useEffect(() => {
        setOpen(() => !!selectedResource);
    }, [selectedResource]);

    if (!open) {
        return null;
    }

    return (
        <div className="w-1/4 border-l-2 p-2 bg-gray-800 text-gray-300">
            <h1 className="text-2xl">Sidebar</h1>
            <h2>Resource Info</h2>
            <h2>Resource Description/Info</h2>
            <h2>Checklist of commonly used subresources</h2>
            <button onClick={() => setOpen(false)}>Close</button>
            <p>
                {selectedResource
                    ? selectedResource.data.resourceState.type
                    : 'No selected resource'}
            </p>
        </div>
    );
};

export default SidebarComponent;

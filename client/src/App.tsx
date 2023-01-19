import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addResource } from './features/ResourceSlice';
import { RootState } from './store/store';
import { azurerm_resource_group } from './resources/test';

function App() {
    // return <Navbar />;
    const dispatch = useDispatch();

    const resource = useSelector(
        (state: RootState) => state.resources.resources,
    );

    return (
        <div>
            <button
                onClick={() =>
                    dispatch(
                        addResource({
                            name: 'azurerm_resource_group',
                            keys: {
                                a: 1,
                                b: '2',
                                c: true,
                            },
                            valid: true,
                        }),
                    )
                }
            >
                Add resource
            </button>
            {/*<TestComponent resource={resources['azurerm_resource_group']} />*/}
            {/*<TestComponent resource={resources['azurerm_container_registry']} />*/}

            {resource.map((x, i) => (
                // <TestComponent resource={x} key={i} />
                <p key={i}>x.name</p>
            ))}
        </div>
    );
}

export default App;

import React from 'react';
import Navbar from './features/navbar/navbar';

function App() {
    return <Navbar />;
    // const dispatch = useDispatch();
    //
    // const resource = useSelector(
    //     (state: RootState) => state.resources.resources,
    // );
    //
    // return (
    //     <div>
    //         <button
    //             onClick={() =>
    //                 dispatch(
    //                     addResource({
    //                         id: resource.length,
    //                         type: 'azurerm_resource_group',
    //                         keys: [
    //                             // { name: 'a', value: '1' },
    //                             // { name: 'b', value: '2' },
    //                             // { name: 'c', value: '3' },
    //                         ],
    //                     }),
    //                 )
    //             }
    //         >
    //             Add resource
    //         </button>
    //         {/*<TestComponent resource={resources['azurerm_resource_group']} />*/}
    //         {/*<TestComponent resource={resources['azurerm_container_registry']} />*/}
    //
    //         {resource.map((x, i) => (
    //             <TestComponent resourceDetails={x} key={x.id} />
    //             // <p key={i}>x.name</p>
    //         ))}
    //     </div>
    // );
}

export default App;

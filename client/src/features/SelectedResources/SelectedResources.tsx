import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const SelectedResources = () => {
    const dispatch = useDispatch();

    const resource = useSelector(
        (state: RootState) => state.resources.resources,
    );

    return (
        <div>
            {resource.map((x) => (
                <div key={x.id} className="bg-gray-300 m-2 p-2 rounded-lg">
                    <h3 className="text-xl text-terraform-purple">{x.type}</h3>
                    {x.keys.map((x) => {
                        return (
                            <div key={x.name} className="m-1 p-1">
                                <label className="mr-2">{x.name}</label>
                                <input value={x.value} />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default SelectedResources;

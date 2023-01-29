import { updateResourceKey } from '../../ResourceSlice';
import { useDispatch } from 'react-redux';
import { IResourceState } from '../../../interfaces/IResourceState';

const ResourceForm = ({ resource }: { resource: IResourceState }) => {
    const dispatch = useDispatch();

    const updateKey = (name: string, value: string) => {
        dispatch(
            updateResourceKey({
                id: resource.id,
                key: name,
                value,
            }),
        );
    };

    return (
        <div className="bg-gray-300 m-2 p-2 rounded-lg">
            <h3 className="text-xl text-terraform-purple">{resource.type}</h3>
            {resource.keys.map((x) => {
                return (
                    <div key={x.name} className="m-1 p-1">
                        <label className="mr-2">{x.name}</label>
                        <input
                            value={x.value}
                            onChange={(e) => {
                                updateKey(x.name, e.target.value);
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ResourceForm;

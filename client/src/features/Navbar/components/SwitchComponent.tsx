import { Switch } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { onAdditionalSettingsUpdate } from '../../SettingsSlice';

const SwitchComponent = () => {
    const dispatch = useDispatch();
    const enabled = useSelector(
        (state: RootState) => state.settings.additionalDetails,
    );

    return (
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-4 text-gray-200">
                    Additional Detail:
                </Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={(x) =>
                        dispatch(
                            onAdditionalSettingsUpdate({
                                additionalDetails: x,
                            }),
                        )
                    }
                    className={`${
                        enabled ? 'bg-blue-600' : 'bg-gray-600'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                    <span
                        className={`${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    );
};

export default SwitchComponent;

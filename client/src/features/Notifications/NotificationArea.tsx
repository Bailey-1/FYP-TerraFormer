import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification';
import { onRemoveNotification } from '../NotificationSlice';

const NotificationArea = () => {
    const notifications = useSelector(
        (state: RootState) => state.notifications,
    );

    const dispatch = useDispatch();

    const onRemove = (id: string) => {
        dispatch(onRemoveNotification({ notificationId: id }));
    };

    return (
        <div className="pointer-events-none fixed inset-0 flex px-4 py-[5rem] items-start">
            <div className="flex w-full flex-col space-y-4 items-end">
                {notifications.map((x) => (
                    <Notification
                        type={x.type}
                        title={x.title}
                        message={x.message}
                        key={x.id}
                        onRemove={() => onRemove(x.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationArea;

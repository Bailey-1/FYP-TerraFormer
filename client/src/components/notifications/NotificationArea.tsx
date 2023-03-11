import Notification from './Notification';

const NotificationArea = () => {
    return (
        <div className="pointer-events-none fixed inset-0 flex px-4 py-[5rem] items-start">
            <div className="flex w-full flex-col space-y-4 items-end">
                <Notification type="success" />
                <Notification type="error" />
                <Notification type="warning" />
            </div>
        </div>
    );
};

export default NotificationArea;

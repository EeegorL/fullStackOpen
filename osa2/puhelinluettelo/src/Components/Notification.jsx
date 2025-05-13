const Notification = ({msg, type}) => {
    return (
        <p className={`${type} notif`}>{msg}</p>
    );
};

export default Notification;
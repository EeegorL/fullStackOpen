const Notification = ({msg, type}) => {
    return (
        <p className={type}>{msg}</p>
    );
};

export default Notification;
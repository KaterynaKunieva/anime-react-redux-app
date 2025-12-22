import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';

const getClasses = createUseStyles(theme => ({
    notificationBar: {
        fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '200px',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: theme.notification.backgroundColor,
        color: theme.notification.primaryColor,
        position: 'absolute',
        left: '50%',
        bottom: 0,
        transform: 'translate(-50%, 0)',
        opacity: 0,
        zIndex: "-1",
        transition: "all .5s",
    },
    visible: {
        opacity: 1,
        bottom: '60px',
        zIndex: "1",
    }
}));

function Notification({ isVisible, setIsVisible, message }) {
    const { theme } = useTheme();
    const classes = getClasses({ theme });

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        }
    },
        [isVisible, setIsVisible]);

    return (
        <div className={`${classes.notificationBar}${isVisible ? " " + classes.visible : ""}`}>
            {message}
        </div>
    );
}

export default Notification;

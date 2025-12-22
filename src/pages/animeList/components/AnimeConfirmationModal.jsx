import React from 'react';
import { useIntl } from "react-intl";
import useTheme from "../../../misc/hooks/useTheme";
import { createUseStyles } from "react-jss";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";

const getClasses = createUseStyles(theme => ({
    modal: {
        boxSizing: "border-box",
        width: "350px",
        maxWidth: "calc(100% - 30px)",
        backgroundColor: "#fff",
        borderRadius: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "15px",
        minHeight: "180px",
        textAlign: "center",
        zIndex: "100",
    },
    modalTitle: {
        fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
        fontSize: "16px",
        fontWeight: "600",
        margin: "0 0 10px 0",
    },
    modalWrapper: {
        position: "absolute",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalBtns: {
        width: "calc(100% - 30px)",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        position: "absolute",
        bottom: "15px",
        left: "15px",
    },
}));

const AnimeConfirmationModal = ({
    title,
    text = "",
    error,
    onConfirm,
    onCancel,
    isLoading,
}) => {
    const { theme } = useTheme();
    const classes = getClasses({ theme });
    const { formatMessage } = useIntl();

    return (
        <>
            <div className={classes.modalWrapper}>
                <div className={classes.modal}>
                    <h5 className={classes.modalTitle}>{title}</h5>
                    <Typography color="black">{text}</Typography>
                    <Typography color="red">{error}</Typography>
                    <div className={classes.modalBtns}>
                        <Button sx={{ width: "50%" }} onClick={onConfirm} colorVariant="primary" isLoading={isLoading}>
                            <Typography color='#fff'>
                                {
                                    formatMessage({ id: 'deleteConfirmationBtnConfirm' })
                                }
                            </Typography>
                        </Button>
                        <Button sx={{ width: "50%" }} onClick={onCancel} colorVariant="secondary">
                            <Typography>
                                {
                                    isLoading
                                        ? formatMessage({ id: 'deleteConfirmationBtnClose' })
                                        : formatMessage({ id: 'deleteConfirmationBtnCancel' })
                                }
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AnimeConfirmationModal;
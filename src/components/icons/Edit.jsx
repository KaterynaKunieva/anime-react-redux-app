import React from 'react';
import SvgIcon from '../SvgIcon';
import useTheme from 'misc/hooks/useTheme';

const Edit = ({
    color = 'default', // default | header | error | success | warning | info | <string>
    size = 32,
}) => {
    const { theme } = useTheme();
    const actualColor = theme.icon.color[color] || color;
    return (
        <SvgIcon
            sx={{
                width: size,
                height: size,
            }}
            viewBox="0 0 24 24"
        >
            <g transform="translate(-0.5, 0.5)">
                <path
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
                    fill={actualColor}
                />
            </g>
        </SvgIcon>
    );
};

export default Edit;

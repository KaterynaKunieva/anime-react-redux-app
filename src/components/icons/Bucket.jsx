import React from 'react';
import SvgIcon from '../SvgIcon';
import useTheme from 'misc/hooks/useTheme';

const Bucket = ({
                  color = 'default', // default | header | error | success | warning | info | <string>
                  size = 32,
              }) => {
    const { theme } = useTheme();
    const actualColor = theme.icon.color[color] || color;
    return (
        <SvgIcon
            sx={{ width: size, height: size }}
            viewBox="0 0 24 24"
        >
            <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                fill={actualColor}
                transform="translate(0, 0.5)"
            />
        </SvgIcon>
    );
};

export default Bucket;

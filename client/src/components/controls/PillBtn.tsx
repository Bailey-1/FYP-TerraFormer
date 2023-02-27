import React from 'react';

const PillButton = ({
    children,
    onClick,
    className,
}: {
    children: any;
    onClick: (val: string) => void;
    className: string | undefined;
}) => {
    return (
        <button
            className={'text-xs rounded-full p-1 px-2 m-1 flex ' + className}
            onClick={(e) => onClick(e.currentTarget.textContent || '')}
        >
            {children}
        </button>
    );
};

export default PillButton;

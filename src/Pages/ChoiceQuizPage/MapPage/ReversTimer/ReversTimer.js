import React from 'react';

const ReversTimer = ({time}) => {

    const minute = Math.floor(time/60)
    const seconds = time - minute*60

    return (
        <span>
            {minute>9?minute:'0'+minute}:{seconds>9?seconds:'0'+seconds}
        </span>
    );
};

export default ReversTimer;
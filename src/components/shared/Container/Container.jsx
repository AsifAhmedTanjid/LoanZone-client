import React from 'react';

const Container = ({children}) => {
    return (
        <div className='container mx-auto xl:px-20 md:px-10 px-2 px-4n'>
            {children}
        </div>
    );
};

export default Container;
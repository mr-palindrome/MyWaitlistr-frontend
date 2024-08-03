import React from 'react';
import "./Loading.modules.css";

const Loading = () => {
    return (

        <div className="loading-container">
            <div className="spinner-border" role="status">
                {/*<span className="sr-only"></span>*/}
            </div>
        </div>
    );
};

export default Loading;
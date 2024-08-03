import React from 'react';
import '../ProjectSettings.modules.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation, faKey, faGear, faWifi} from "@fortawesome/free-solid-svg-icons";

const LgProjectSideNav = ({activeOption, setActiveOption}) => {

    return (
        <div className="sideNav mx-2 mt-2">
            <div className={`navOption ${activeOption === "general" ? "activeOption" : "inActiveOption"}`}
                 onClick={() => setActiveOption("general")}>
                <FontAwesomeIcon icon={faGear} className="fontAwesomeIcon mx-4"/>
                <span>General</span>
            </div>
            {/*<div className={`navOption ${activeOption === "network" ? "activeOption" : "inActiveOption"}`}*/}
            {/*     onClick={() => setActiveOption("network")}>*/}
            {/*    <FontAwesomeIcon icon={faWifi} className="fontAwesomeIcon mx-4"/>*/}
            {/*    <span>Network</span>*/}
            {/*</div>*/}
            <div className={`navOption ${activeOption === "api_key" ? "activeOption" : "inActiveOption"}`}
                 onClick={() => setActiveOption("api_key")}>
                <FontAwesomeIcon icon={faKey} className="fontAwesomeIcon mx-4"/>
                <span>API Key</span>
            </div>
            <div className={`navOption ${activeOption === "danger" ? "activeOption" : "inActiveOption"}`}
                 onClick={() => setActiveOption("danger")}>
                <FontAwesomeIcon icon={faTriangleExclamation} className="fontAwesomeIcon mx-4"/>
                <span>Danger</span>
            </div>
        </div>
    );
};

export default LgProjectSideNav;
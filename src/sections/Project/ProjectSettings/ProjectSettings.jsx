import React, {useContext, useEffect, useState} from 'react';
import LgProjectSideNav from "./UtilComponents/LgProjectSideNav.jsx";
import SmProjectSideNav from "@/sections/Project/ProjectSettings/UtilComponents/SmProjectSideNav.jsx";
import GeneralSettings from "./UtilComponents/GeneralSettings.jsx";
import APiSettings from "./UtilComponents/APISettings.jsx";
import DangerSettings from "./UtilComponents/DangerSettings.jsx";
import {ProjectDetailsContext} from "@/sections/Project/ProjectDetails/ProjectDetails.jsx";
import './ProjectSettings.modules.css';
// import Particles from "@/components/magicui/particles.jsx";

const ProjectSettings = () => {
    const [activeOption, setActiveOption] = useState('general');

    const windowWidth = window.innerWidth;

    return (
        <div className="container p-5 settingNav">
            {/*<Particles*/}
            {/*    className="absolute inset-0"*/}
            {/*    quantity={100}*/}
            {/*    ease={80}*/}
            {/*    color="#000000"*/}
            {/*    refresh*/}
            {/*/>*/}

            <LgProjectSideNav activeOption={activeOption} setActiveOption={setActiveOption}/>
            <div className="navContent">
                <SmProjectSideNav activeOption={activeOption} setActiveOption={setActiveOption}/>
                {activeOption === 'general' && <GeneralSettings />}
                {activeOption === 'network' && <div>Network Content</div>}
                {activeOption === 'api_key' && <APiSettings/>}
                {activeOption === 'danger' && <DangerSettings />}
            </div>
        </div>
    );
};

export default ProjectSettings;
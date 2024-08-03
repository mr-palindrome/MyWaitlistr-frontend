import React from 'react';
import "../../Login/Login.modules.css";
import "../Projects.modules.css";
import email from "../../../assets/icons/envelope-solid.svg";
import password from "../../../assets/icons/lock-solid.svg";
import linkIcon from "../../../assets/icons/link-solid.svg";
import projectIcon from "../../../assets/icons/file-solid.svg";
import descIcon from "../../../assets/icons/align-justify-solid.svg";


const CreateProject = () => {
    return (
            <div className="container input-container">
                <div className="row mt-3 input">
                    <div className="col">
                        <img src={projectIcon} alt="email-icon"/>
                        <input type="text" name="projectName" className="form-control" placeholder="Project Name" required/>
                    </div>
                </div>
                <div className="row mt-3 input descInput">
                    <div className="col">
                        <img src={descIcon} alt="password-icon"/>
                        <textarea
                            name="projectDescription"
                            className="form-control"
                            placeholder="Description"
                            rows="2"
                            required/>
                    </div>
                </div>
                <div className="row mt-3 input">
                    <div className="col">
                        <img src={linkIcon} alt="password-icon"/>
                        <input type="text" name="projectURL" className="form-control" placeholder="Website URL"/>
                    </div>
                </div>
            </div>
    );
};

export default CreateProject;
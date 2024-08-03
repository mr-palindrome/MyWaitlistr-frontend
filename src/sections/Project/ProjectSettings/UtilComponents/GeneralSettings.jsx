import React, {useContext, useState} from 'react';
import {ProjectDetailsContext} from "@/sections/Project/ProjectDetails/ProjectDetails.jsx";
import {useAxios} from "@/utils/useAxios.jsx";
import {Button} from "@/components/ui/button"

import "./UtilStyles.modules.css"
import "@/sections/Login/Login.modules.css"
import swal from 'sweetalert2';

const GeneralSettings = () => {

    const {projectDetails, setProjectDetails, projectID} = useContext(ProjectDetailsContext);

    const [updatedDetails, setUpdatedDetails] = useState({
        name: projectDetails.name,
        description: projectDetails.description,
        url: projectDetails.url
    });
    const [loading, setLoading] = useState(false);

    const axiosInstance = useAxios();

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.patch(`/projects/v1/project/${projectID}`, updatedDetails);
            console.log(response.data);
            if (response.status !== 200) {
                swal.fire({
                    title: response.data.message,
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            setProjectDetails(response.data.data);
            swal.fire({
                title: "Updated Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error) {
            swal.fire({
                title: error,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    return (
        <div className="container generalDiv">
            <div className="row">
                <label htmlFor="name">Project Name</label>
                <input type="text" id="name" value={updatedDetails.name}
                       onChange={(e) => setUpdatedDetails({...updatedDetails, name: e.target.value})}/>
            </div>
            <div className="row">
                <label htmlFor="description">Project Description</label>
                <textarea id="description" value={updatedDetails.description}
                          onChange={(e) => setUpdatedDetails({...updatedDetails, description: e.target.value})}/>
            </div>
            <div className="row">
                <label htmlFor="url">Project URL</label>
                <input type="text" id="url" value={updatedDetails.url}
                       onChange={(e) => setUpdatedDetails({...updatedDetails, url: e.target.value})}/>
            </div>
            <div className="row">
                <label htmlFor="projectId">Project ID:</label>
                <input
                    type="text"
                    className="disabled"
                    id="projectId"
                    title="Click to copy"
                    onClick={() => navigator.clipboard.writeText(projectID)}
                    value={projectID}
                    readOnly
                />
            </div>
            <div className="px-3">
                <button
                    className="border-black createButton"
                    onClick={() => handleUpdate()}
                >
                    Update
                </button>
            </div>

        </div>
    );
};

export default GeneralSettings;
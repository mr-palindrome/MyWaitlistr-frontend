import React, { useState, useContext } from 'react';
import { ProjectDetailsContext } from "@/sections/Project/ProjectDetails/ProjectDetails.jsx";
import {useAxios} from "@/utils/useAxios.jsx";
import { useHistory } from 'react-router-dom';

const DangerSettings = () => {
    const { projectDetails } = useContext(ProjectDetailsContext);
    const [inputValue, setInputValue] = useState('');
    const axiosInstance = useAxios();
    const history = useHistory();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const deleteProject = async () => {
        try {
            // const response = await axiosInstance.delete(`/projects/v1/project/${projectDetails.project_id}`);
            // console.log(response.data);
            history.push('/projects');
        } catch (error) {
            console.log("Error deleting project", error);
        }
    }

    return (
        <div className="pt-3">
            <h4>Delete Project</h4>

            <div className="dangerAlert mt-5">
                <p>Warning: Deleting a project is irreversible. All data associated with the project will be permanently
                    deleted including the Waitlists.</p>
            </div>
            <div className="pt-4">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => console.log("Delete Project")}
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                >
                    Delete Project
                </button>

                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="container flex justify-end pt-2">
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5>Delete Project</h5>
                                <p>Are you sure you want to delete {projectDetails.name}? This action will delete all the waitlist entries associated with the project. It is suggested to download the existing waitlist before deleting the project.</p>
                                <div className="row">
                                    <span className="text-sm text-zinc-500">Type <b>delete</b> to confirm</span>
                                    <input
                                        type="text"
                                        className="m-3 border-gray-600 border-2 w-75"
                                        style={{ height: "40px", borderRadius: "5px" }}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    disabled={inputValue.toLowerCase() !== 'delete'}
                                    onClick={() => deleteProject()}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DangerSettings;
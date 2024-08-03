import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import { useAxios } from "../../utils/useAxios.jsx";
import "./Projects.modules.css";
import "../Login/Login.modules.css";
import linkIcon from '/src/assets/icons/link-solid.svg';
import user from "../../assets/icons/user-solid.svg";
import CreateProject from "./CreateProject/CreateProject.jsx";
import Loading from '../Loading/Loading.jsx';
// import Particles from "@/components/magicui/particles";
import {Button} from "@/components/ui/button.jsx";
// import { cn } from "@/lib/utils";
// import DotPattern from "@/components/magicui/dot-pattern.jsx";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const axiosInstance = useAxios();
    const history = useHistory();

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        const projectName = e.target.projectName.value || null;
        const projectDescription = e.target.projectDescription.value || null;
        const projectURL = e.target.projectURL.value || null;

        console.log("Create Project");
        try {
            console.log("axios Creating project");
            await axiosInstance.post("/projects/v1/create", {
                name: projectName,
                description: projectDescription,
                url: projectURL
            });
            fetchProjects(); // Fetch projects after creating one
        } catch (error) {
            console.log("Error creating project", error);
        } finally {
            console.log("Finally");
            e.target.reset();
        }
    };

    useEffect(() => {
        console.log("useEffect");
        const fetchProjects = async () => {
            try {
                // sleep for 10 seconds
                const response = await axiosInstance.get("/projects/v1/projects");
                setProjects(response.data.data);
            } catch (error) {
                console.log("Error fetching projects", error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
        fetchProjects();

    }, []);

    const handleTextTruncate = (text) => {
        if (text.length > 100) {
            return `${text.substring(0, 100)}...`;
        } else {
            return text;
        }
    };

    const handleProjectClick = (projectID) => {
        console.log(`/projects/${projectID}`);
        history.push(`/projects/${projectID}`);
    };

    return (
        <div className="p-5">
            <div className="container flex items-center justify-between align">
                <h3 className="px-3">Your Projects</h3>
                <button
                    className="border-black createButton"
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >
                    Create New Project
                </button>
            </div>
            {loading ? (
                <div className="container">
                    <Loading />
                </div>
            ) : (
                <div className="container-fluid listDiv">
                    <div className="innerListDiv">
                        <ul className="projectList">
                            {projects.map(project => (
                                <li key={project.id} onClick={() => handleProjectClick(project.project_id)}>
                                    <div className="card mb-3">
                                        {/*<DotPattern*/}
                                        {/*    className={cn(*/}
                                        {/*        "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",*/}
                                        {/*    )}*/}
                                        {/*/>*/}

                                        <div className="card-header card-title">
                                            {project.name}
                                        </div>
                                        <div className="container">
                                            <div className="card-body">
                                                <p className="card-text">{handleTextTruncate(project.description)}.</p>
                                            </div>
                                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                {project.url}
                                            </a>
                                        </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                         tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Project</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <form onSubmit={handleProjectSubmit}>
                                    <div className="modal-body">
                                        <CreateProject />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="submit gray" data-bs-dismiss="modal">Close
                                        </button>
                                        <button type="submit" className="submit">Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;

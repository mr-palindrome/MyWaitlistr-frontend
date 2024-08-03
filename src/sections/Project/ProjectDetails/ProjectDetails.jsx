import React, {useEffect, useState, createContext, useContext} from 'react';
import {useParams} from "react-router-dom";
import {useAxios} from "@/utils/useAxios.jsx";
import moment from 'moment-timezone';
import Loading from "../../Loading/Loading.jsx";
import ProjectSettings from "../ProjectSettings/ProjectSettings.jsx";
import ProjectWaitlists from "../ProjectWaitlists/ProjectWaitlists.jsx";
import "./ProjectDetails.modules.css";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const ProjectDetailsContext = createContext({});

const ProjectDetails = () => {
    const [projectDetails, setProjectDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const {projectID} = useParams();
    const axiosInstance = useAxios();

    const [breadcrumbs, setBreadcrumbs] = useState([]);


    console.log("inside project details", projectID, projectDetails);

    const [navigation, setNavigation] = useState("waitlist");

    useEffect(() => {
        const updatedBreadcrumbs = [];
        setBreadcrumbs([]);
        console.log("breadcrumbs emtpy", updatedBreadcrumbs);

        const fetchProject = async () => {
            try {
                const response = await axiosInstance.get(`/projects/v1/project/${projectID}`);
                console.log(response.data);
                setProjectDetails(response.data.data);
                updatedBreadcrumbs.push(response.data.data.name);
                updatedBreadcrumbs.push(navigation);
                // setBreadcrumbs(breadcrumbs);
            } catch (error) {
                console.log("Error fetching project", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
        setBreadcrumbs(updatedBreadcrumbs);

        console.log("breadcrumbs", updatedBreadcrumbs);
    }, [projectID, navigation]);

    const formatDate = (dateString) => {
        return moment.tz(dateString, "Asia/Kolkata").tz("GMT").format("HH:mm MMMM DD, YYYY [GMT]");
    };

    if (loading) {
        return <Loading/>;
    }

    if (!projectDetails) {
        return <p>Project not found</p>;
    }

    const projectContext = {
        projectDetails,
        setProjectDetails,
        projectID,
        formatDate
    }

    return (
        <ProjectDetailsContext.Provider value={projectContext}>
            <div className="projectNav">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbs.map((breadcrumb, index) => (
                            <div className="flex align-items-center justify-content-center">
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem key={index}>
                                    {breadcrumb}
                                </BreadcrumbItem>
                            </div>
                        ))}
                        {/*<BreadcrumbItem>*/}
                        {/*    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>*/}
                        {/*</BreadcrumbItem>*/}
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="projectInnerNav">
                    {/*<a onClick={() => setNavigation("waitlist")}>Waitlist</a>*/}
                    {/*<a onClick={() => setNavigation("settings")}>Settings</a>*/}
                    <Tabs defaultValue="waitlist" className="w-[100%]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="waitlist" onClick={() => setNavigation("waitlist")}>Waitlist</TabsTrigger>
                            <TabsTrigger value="settings" onClick={() => setNavigation("settings")}>Settings</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

            </div>
            {navigation === "waitlist" ? (
                <ProjectWaitlists/>
            ) : (
                <ProjectSettings/>
            )}

        </ProjectDetailsContext.Provider>
    );
};

export default ProjectDetails;
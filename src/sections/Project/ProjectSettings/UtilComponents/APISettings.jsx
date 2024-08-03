import React, {useContext, useEffect, useState} from 'react';
import {ProjectDetailsContext} from "@/sections/Project/ProjectDetails/ProjectDetails.jsx";
import "./UtilStyles.modules.css";
import {useAxios} from "@/utils/useAxios.jsx";
import swal from 'sweetalert2';
import {Button} from "@/components/ui/button.jsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Loading from '@/sections/Loading/Loading.jsx';


const ApiSettings = () => {
    const {projectDetails, formatDate} = useContext(ProjectDetailsContext);
    const axiosInstance = useAxios();

    const [loading, setLoading] = useState(true);
    const [apiKeys, setApiKeys] = useState([]);
    const [aliasValues, setAliasValues] = useState({});

    const fetchApiKeys = async () => {
        try {
            const response = await axiosInstance.get(`/api_key/v1/${projectDetails.project_id}/list`);
            console.log(response.data);
            setApiKeys(response.data.data);

            // Initialize aliasValues state with current aliases
            const initialAliases = {};
            response.data.data.forEach((key) => {
                initialAliases[key.id] = key.alias;
            });
            setAliasValues(initialAliases);
            setLoading(false);

        } catch (error) {
            console.log("Error fetching API keys", error);
            swal.fire({
                title: "Error fetching API keys",
                text: error.message,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const createAPIKey = async () => {
        try {
            const response = await axiosInstance.post(`/api_key/v1/${projectDetails.project_id}/create`);
            console.log(response.data);
            fetchApiKeys();
        } catch (error) {
            console.log("Error creating API key", error);
            swal.fire({
                title: "Error creating API key",
                text: error.message,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const deleteAPIKey = async (key_id) => {
        try {
            const response = await axiosInstance.delete(`/api_key/v1/${projectDetails.project_id}/${key_id}`);
            console.log(response.data);
            fetchApiKeys();
        } catch (error) {
            console.log("Error deleting API key", error);
            swal.fire({
                title: "Error deleting API key",
                text: error.message,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const updateAPIKey = async (key_id) => {
        try {
            const alias = aliasValues[key_id];
            const response = await axiosInstance.patch(`/api_key/v1/${projectDetails.project_id}/${key_id}/alias`, null, {
                params: {alias}
            });
            console.log(response.data);
            fetchApiKeys();
        } catch (error) {
            console.log("Error updating API key", error);
            swal.fire({
                title: "Error updating API key",
                text: error.message,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    useEffect(() => {
        fetchApiKeys();
    }, [projectDetails.project_id]); // Adding project_id as a dependency to fetch keys whenever project_id changes

    const handleAliasChange = (key_id, newAlias) => {
        setAliasValues((prev) => ({
            ...prev,
            [key_id]: newAlias,
        }));
    };

    return (
        <div>
            <div className=" pt-3 flex items-center justify-between">
                <span className="text-gray-500">A list of your API Keys.</span>
                <button
                    className="border-black createButton"
                    onClick={() => createAPIKey()}
                >
                    Create API Key
                </button>

            </div>
            <div className="pt-2">
                {loading ? <Loading/> : (

                    <>
                        {apiKeys.length === 0 ? (
                            <div className="container pt-3 text-zinc-500">
                                You don't have any API Key yet. Click on the <b>Create API Key</b> button to create one.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>API Key</TableHead>
                                        <TableHead className="text-center">Alias</TableHead>
                                        <TableHead className="text-center">Created At</TableHead>
                                        <TableHead className="text-right">Operations</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {apiKeys.map((key) => (
                                        <TableRow key={key.id}>
                                            <TableCell className="font-medium">{key.key}</TableCell>
                                            <TableCell className="text-center">
                                                <input
                                                    className="text-center"
                                                    type="text"
                                                    value={aliasValues[key.id] || ''}
                                                    placeholder="Enter alias"
                                                    onChange={(e) => handleAliasChange(key.id, e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>{formatDate(key.created_at)}</TableCell>
                                            <TableCell className="text-center">
                                    <span
                                        className="mr-2 cursor-pointer hover:underline"
                                        onClick={() => updateAPIKey(key.id)}
                                    >
                                        Update
                                    </span>
                                                <span
                                                    className="mr-2 cursor-pointer hover:underline"
                                                    onClick={() => deleteAPIKey(key.id)}
                                                >
                                        Delete
                                    </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </>)}

            </div>
        </div>
    );
};

export default ApiSettings;

import React, {useContext, useEffect, useState} from 'react';
import {useAxios} from "@/utils/useAxios.jsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import "@/sections/Project/Projects.modules.css";
import "@/sections/Project/ProjectWaitlists/ProjectWaitlists.modules.css";
import Loading from '@/sections/Loading/Loading.jsx';
import {ProjectDetailsContext} from "@/sections/Project/ProjectDetails/ProjectDetails.jsx"
import swal from 'sweetalert2';


const ProjectWaitlists = () => {
    const axiosInstance = useAxios();
    const {projectDetails, formatDate} = useContext(ProjectDetailsContext);
    const [waitlists, setWaitlists] = useState([]);
    const [totalWaitlists, setTotalWaitlists] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Number of waitlists per page

    const [loading, setLoading] = useState(true);
    const [taskId, setTaskId] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const MAX_POLLING_COUNT = 10;

    const handleDownload = async (extType) => {
        try {
            const response = await axiosInstance.get(`/projects/v1/${projectDetails.project_id}/waitlist/download?ext_type=${extType}`);
            if (response.status === 200) {
                setTaskId(response.data.data.download_id);
                swal.fire({
                    title: "File will be downloaded shortly.",
                    icon: "info",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.log("Error downloading waitlist", error);
            swal.fire({
                title: "Error downloading waitlist",
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
        const fetchWaitlists = async () => {
            try {
                const response = await axiosInstance.get(`/projects/v1/${projectDetails.project_id}/waitlist/list?page=${currentPage}&size=${pageSize}`);
                setWaitlists(response.data.data);
                setTotalWaitlists(response.data.total);
                setLoading(false);
            } catch (error) {
                swal.fire({
                    title: "Error fetching waitlists",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        };
        fetchWaitlists();
    }, [projectDetails.project_id, currentPage, pageSize]);

    useEffect(() => {
        if (taskId) {
            let currentPollingCount = 0;
            // Start polling
            const interval = setInterval(async () => {
                try {
                    const response = await axiosInstance.get(`/projects/v1/${projectDetails.project_id}/waitlist/download/${taskId}`);
                    if (response.status === 200) {
                        setDownloadUrl(response.data.data.download_url);
                        swal.fire({
                            title: "Downloading started...",
                            icon: "success",
                            toast: true,
                            timer: 6000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false,
                        });
                        clearInterval(interval); // Stop polling
                    } else if (response.status === 202) {
                    }
                } catch (error) {
                    clearInterval(interval);
                    swal.fire({
                        title: "Error while downloading! Try again later!",
                        icon: "error",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                }

                currentPollingCount += 1;
                if (currentPollingCount >= MAX_POLLING_COUNT) {
                    clearInterval(interval); // Stop polling after max attempts
                    swal.fire({
                        title: "The process is taking too long. Please try again later.",
                        icon: "error",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                }
            }, 3000);

            // Cleanup function to clear the interval when the component unmounts or taskId changes
            return () => clearInterval(interval);
        }
    }, [taskId]);

    useEffect(() => {
        if (downloadUrl) {
            console.log("Download URL", downloadUrl);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', '');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [downloadUrl]);

    const totalPages = Math.ceil(totalWaitlists / pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container p-2 w-75">
            {loading ? <Loading /> : (
                <>
                    {totalWaitlists === 0 ? (
                        <div className="container pt-3 text-zinc-500">
                            No one registered for your waitlists yet.
                        </div>
                    ) : (
                        <>
                            <div className="container p-3 text-zinc-500 flex justify-between">
                                <div className="container">
                                    <p className="text-gray-500">Your waitlists:</p>
                                </div>
                                <div className="container flex justify-end">
                                    <button
                                        className="border-black utilitButton mx-2"
                                        onClick={() => handleDownload("csv")}
                                    >
                                        Download CSV
                                    </button>
                                    <button
                                        className="border-black utilitButton mx-2"
                                        onClick={() => handleDownload("json")}
                                    >
                                        Download JSON
                                    </button>
                                    <button
                                        className="border-black utilitButton mx-2"
                                        onClick={() => handleDownload("xml")}
                                    >
                                        Download XML
                                    </button>
                                </div>
                            </div>
                            <Table className="text-center">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">Email</TableHead>
                                        <TableHead className="text-center">Added Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {waitlists.map((waitlist) => (
                                        <TableRow key={waitlist.waitlist_id}>
                                            <TableCell>{waitlist.email}</TableCell>
                                            <TableCell>{formatDate(waitlist.date_added)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="pagination-controls">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ProjectWaitlists;
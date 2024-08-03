import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import "./UtilStyles.modules.css";


const SmProjectSideNav = ({activeOption, setActiveOption}) => {
    return (
        <div className="upperNav">
            <Tabs defaultValue="account" className="optionDiv w-[100%]">
                <TabsList>
                    <TabsTrigger className="navOption" value="general" onClick={() => setActiveOption("general")}>General</TabsTrigger>
                    <TabsTrigger className="navOption" value="api_key" onClick={() => setActiveOption("api_key")}>API Key</TabsTrigger>
                    <TabsTrigger className="navOption" value="danger" onClick={() => setActiveOption("danger")}>Danger</TabsTrigger>
                </TabsList>
            </Tabs>

        </div>
    );
};

export default SmProjectSideNav;
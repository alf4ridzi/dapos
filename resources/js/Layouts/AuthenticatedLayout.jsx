import React from "react";
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";

export default function AuthenticatedLayout({ children, user }) {
    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar user={user} />
                <main className="p-6 md:p-8 lg:p-10">{children}</main>
            </div>
        </div>
    );
}

import React from "react";
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthenticatedLayout({ children, user }) {
    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar user={user} />
                <main className="p-6 md:p-8 lg:p-10">{children}</main>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="dark:bg-gray-800 dark:text-white"
                bodyClassName="dark:bg-gray-800 dark:text-white"
            />
        </div>
    );
}

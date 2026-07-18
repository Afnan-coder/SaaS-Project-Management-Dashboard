import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-white p-4">
                Sidebar
            </aside>

            {/* Main Content */}
            <div className="flex-1">

                {/* Navbar */}
                <header className="h-16 bg-white shadow flex items-center px-6">
                    Navbar
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;
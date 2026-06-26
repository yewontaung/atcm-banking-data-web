import { Outlet } from "react-router-dom";
import AppSidebar from "../_components/app-sidebar";

export default function MainLayout() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto">
                        <AppSidebar />
                    </div>
                    <div className="col ps-0 pe-2">
                        <div className="min-vh-100 py-2 d-flex flex-column">
                            <div className="border flex-grow-1 p-2"><Outlet /></div>
                        </div>
                    </div>
                </div>
            </div>
            <section>

            </section>
        </>
    )
}
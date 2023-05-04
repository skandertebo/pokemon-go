import Dashboard from "../components/DashboardAdmin";

function DashboardPage(){
    return(
        <div className="flex h-screen md:items-center lg:items-end bg-cover md:justify-end bg-secondary">
            <Dashboard/>
        </div>
    )
}

export default DashboardPage;
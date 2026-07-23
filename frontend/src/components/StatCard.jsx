const StatCard = ({ title, value, icon, colorClass }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">

            <div>

                <p className="text-gray-500 text-sm font-medium">
                    {title}
                </p>

                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                    {value}
                </h2>

            </div>

           <div className={`${colorClass} p-4 rounded-full text-3xl`}>
                {icon}
            </div>

        </div>
    );
};

export default StatCard;
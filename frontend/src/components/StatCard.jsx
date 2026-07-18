const StatCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">

            <h2 className="text-gray-500 text-lg">
                {title}
            </h2>

            <h1 className="text-4xl font-bold mt-4">
                {value}
            </h1>

        </div>
    );
};

export default StatCard;
const Cell = ({
    title,
    type,
    data,
    addCount,
    updateCount,
    changeData,
    setChangeData,
}) => {
    return (
        <div className="flex flex-col h-full m-1 bg-gray-100 border border-gray-300 rounded-xl">
            <div className="bg-blue-200 p-2 text-lg font-semibold rounded-t-xl">{title}</div>
            {type === "txt" && (
                <div className="flex-1 p-2 mb-2 bg-gray-200 text-gray-800 rounded-b-xl overflow-auto">{data.description}</div>
            )}
            {type === "img" && (
                <div className="flex-1 p-2 mb-2 bg-gray-200 text-gray-800 rounded-b-xl overflow-hidden">
                    <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" alt="img" />
                </div>
            )}
            {type === "btn" && (
                <div className="flex h-full justify-between items-center p-4 bg-gray-200 rounded-b-xl">
                    <div className="flex items-center space-x-4 text-gray-800">
                        <span className="font-bold">Add Count:</span>
                        <span>{addCount}</span>
                    </div>
                    <div>
                        <button
                            onClick={() => setChangeData("add")}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
                        >
                            Add
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => setChangeData("update")}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                        >
                            Update
                        </button>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-800">
                        <span className="font-bold">Update Count:</span>
                        <span>{updateCount}</span>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Cell;

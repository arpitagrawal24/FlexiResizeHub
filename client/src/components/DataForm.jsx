import { useState, useEffect } from 'react';
import axios from 'axios';

const DataForm = ({
    changeData,
    setChangeData,
    fetchCounts,
    fetchData,
    data,
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (changeData === 'update' && data) {
            setTitle(data.title || '');
            setDescription(data.description || '');
        }
    }, [changeData, data]);

    const handleAddButtonClick = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER}/api/addData`, {
                title,
                description
            });
            // Update counts after adding data
            fetchCounts();
            fetchData();
            setChangeData(null);
        } catch (error) {
            console.error('Error adding data:', error);
            setError('Error adding data');
        }
    };

    const handleUpdateButtonClick = async () => {
        const id = JSON.parse(localStorage.getItem('data'))._id;

        try {
            const res = await axios.put(`${import.meta.env.VITE_SERVER}/api/editData/${id}`, {
                title,
                description
            });

            if (res.data.success) {
                fetchCounts();
                fetchData();
                setChangeData(null);
            }
        } catch (error) {
            console.error('Error updating data:', error);
            setError('Error updating data');
        }
    };

    return (
        <>
            {changeData && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="w-1/2 p-4 bg-white rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{changeData === 'add' ? 'Add' : 'Update'} Data</h2>
                        {error && <div className="text-red-500 mb-2">{error}</div>}
                        <form onSubmit={changeData === 'add' ? handleAddButtonClick : handleUpdateButtonClick}>
                            <input
                                type="text"
                                className="block w-full border rounded-md py-2 px-3 mb-2"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className="block w-full border rounded-md py-2 px-3 mb-2 min-h-48"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                                >
                                    {changeData === 'add' ? 'Add' : 'Update'}
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                                    onClick={() => {
                                        setChangeData(null);
                                        setTitle('');
                                        setDescription('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataForm;

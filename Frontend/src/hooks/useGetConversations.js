import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const res = await fetch('/api/users');
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                setConversations(data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
                setError(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations, error };
};

export default useGetConversation;

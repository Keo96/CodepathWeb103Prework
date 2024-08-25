import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import Back from '../assets/back.png';
import Youtube from '../assets/youtube.png';
import Edit from '../assets/pencil.png';
import Delete from '../assets/trash.png';
import './Info.css';

function Info() {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getCreator = async () => {
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select()
                    .eq('id', id);

                if (error) {
                    throw error;
                }

                if (data.length > 0) {
                    setCreator(data[0]);
                }
            } catch (error) {
                setError('Failed to load creator data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getCreator();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/edit/${creator?.id}`);
    };

    const handleDeleteClick = async () => {
        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            } else {
                navigate('/');
            }
        } catch (error) {
            setError('Failed to delete creator');
            console.error(error);
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="info">
            <a href="/" aria-label="Go back to home">
                <img className="back-btn" src={Back} alt="Back button" width="20px" />
            </a>
            <div className="info-content">
                <h1>{creator?.name}</h1>
                {creator?.imageURL && (
                    <img className="info-image" src={creator.imageURL} alt={creator.name} />
                )}
                <h4>{creator?.description}</h4>
                <p>Check out {creator?.name} Youtube below</p>
            </div>
            <div className="info_social-medias">
                {creator?.url && (
                    <a href={creator.url} target="_blank" rel="noopener noreferrer">
                        <img src={Youtube} alt="Youtube link" />
                    </a>
                )}
            </div>
            <div className="info__edit-delete">
                <img src={Edit} alt="Edit creator" className="info__edit-btn" onClick={handleEditClick} />
                <img src={Delete} alt="Delete creator" className="info__delete-btn" onClick={handleDeleteClick} />
            </div>
        </div>
    );
}

export default Info;

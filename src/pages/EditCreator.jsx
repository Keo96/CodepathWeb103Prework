import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCreator.css';
import { supabase } from '../client';
import Back from '../assets/back.png';

const EditCreator = ({ data }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState({ id: null, name: "", url: "", description: "", imageURL: "" });

    // Fetch the current creator data based on the ID from params
    useEffect(() => {
        const fetchCreator = async () => {
            const { data: creatorData, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setCreator(creatorData);
            }
        };

        fetchCreator();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateCreator = async (event) => {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('creators')
                .update({
                    name: creator.name,
                    url: creator.url,
                    description: creator.description,
                    imageURL: creator.imageURL,
                })
                .eq('id', id);

            if (error) {
                console.error('Error updating creator:', error);
            } else {
                navigate('/'); // Use useNavigate to redirect
            }
        } catch (error) {
            console.error('Error in updateCreator:', error);
        }
    };

    const deleteCreator = async (event) => {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting creator:', error);
            } else {
                navigate('/'); // Use useNavigate to redirect
            }
        } catch (error) {
            console.error('Error in deleteCreator:', error);
        }
    };

    return (
        <div className="edit">
            <a href="/">
                <img className="back-btn" src={Back} alt="back button" width="20px" />
            </a>
            <h1 className="namePage">Editing a Creator</h1>
            <div>
                <form>
                    <label htmlFor="name">Name</label> <br />
                    <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} /><br />
                    <br />

                    <label htmlFor="url">Youtube Url</label><br />
                    <input type="text" id="url" name="url" value={creator.url} onChange={handleChange} /><br />
                    <br />

                    <label htmlFor="description">Description</label><br />
                    <textarea rows="5" cols="50" id="description" name="description" value={creator.description} onChange={handleChange} />
                    <br />

                    <label htmlFor="imageURK+L">Image URL</label><br />
                    <input type="text" id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleChange} /><br />
                    <br />

                    <input type="submit" value="Submit" onClick={updateCreator} />

                    <button className="deleteButton" onClick={deleteCreator}>Delete</button>
                </form>
            </div>
        </div>
    );
};

export default EditCreator;

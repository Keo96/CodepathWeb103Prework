import React, {useState} from 'react';
import './AddCreator.css'
import { supabase } from '../client'
import Back from '../assets/back.png'

const AddCreator = () => {

    const [creator, setCreator] = useState({name: "", url: "", description: "", imageURL: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCreator( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const addCreator = async (event) => {
        event.preventDefault();
        await supabase
            .from('creators')
            .insert({name: creator.name, url: creator.url, description: creator.description, imageURL: creator.imageURL})
            .select();

        window.location = "/";
    }

    return (
        <div className="create">
            <a href="/">
                <img className="back-btn" src={Back} alt="back button" width='20px' />
            </a>
            <h1 className="namePage">Creating a Creator</h1>
            <div>
                <form>
                    <label for="name">Name</label> <br />
                    <input type="text" id="name" name="name" onChange={handleChange} /><br />
                    <br/>

                    <label for="url">Youtube Url</label><br />
                    <input type="text" id="url" name="url" onChange={handleChange} /><br />
                    <br/>

                    <label for="description">Description</label><br />
                    <textarea rows="5" cols="50" id="description" name='description' onChange={handleChange}>
                    </textarea>
                    <br/>

                    <label for="imageURL">Image URL</label><br />
                    <input type="text" id="imageURL" name="imageURL" onChange={handleChange} /><br />
                    <br/>

                    <input type="submit" value="Create Creator" onClick={addCreator} />
                </form>
            </div>
        </div>
    )
}

export default AddCreator
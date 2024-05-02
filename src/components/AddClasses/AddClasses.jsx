import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseApiUrl, uploadClassEndpoint, uploadProjectEndpoint } from '../../config';
import axios from 'axios';
import './addclasses.css'

const AddClasses = ({apiToken}) => {
    const {project_name} = useParams();
    const [classString, setClassString] = useState("");
    const navigate = useNavigate();

    const handleClassStringChange = (e) => {
        setClassString(e.target.value);
    }

    const handleCancel = (e) => {
        navigate("/dashboard")
    }

    const handleSubmit = async (e) => {
        try {
            const response = await axios.put(baseApiUrl + uploadClassEndpoint, {
              project_name: project_name,
              class_info: classString,
              api_token: apiToken
          });
            console.log("Here is API response")
            console.log(response)
          }
          catch (e) {
            console.log(e.response)
          }
        navigate("/dashboard")
    }

    return (
        <div id="main">
            <div class="add-class-div">
                <p id="header">Adding classes for {project_name}</p>
                <p id="input-info">Enter classes with no spaces, seperated by the '|' character</p>
                <input
                    type="text"
                    id="classString"
                    value={classString}
                    onChange={handleClassStringChange}
                />
                <div className='row'>
                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                    <button className="submit" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddClasses;
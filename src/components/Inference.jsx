import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseApiUrl, uploadClassEndpoint, uploadProjectEndpoint } from '../config';
import axios from 'axios';

const Inference = ({apiToken}) => {
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
        <div class="add-class-div">
            <p>Adding classes for {project_name}</p>
            <p>Enter classes with no spaces, seperated by the '|' character</p>
            <input
                type="text"
                id="classString"
                value={classString}
                onChange={handleClassStringChange}
            />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Save</button>
        </div>
    );
};

export default Inference;
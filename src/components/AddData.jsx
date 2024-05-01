import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseApiUrl, uploadClassEndpoint, uploadDataEndpoint, uploadProjectEndpoint } from '../config';
import axios from 'axios';

const AddData = ({apiToken}) => {
    const {project_name} = useParams();

    const [labelString, setLabelString] = useState("");
    const [dataPointName, setDataPointName] = useState("");
    const [base64Image, setBase64Image] = useState('');

    const navigate = useNavigate();

    const handleLabelStringChange = (e) => {
        setLabelString(e.target.value);
    }

    const handleCancel = (e) => {
        navigate("/dashboard")
    }

    const handleMore = (e) => {
        navigate(`/adddatas/${project_name}`)
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setDataPointName(file.name)
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            const base64WithoutPrefix = base64String.split(',')[1];
            setBase64Image(base64WithoutPrefix);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
        console.log(base64Image)
    }

    const handleSubmit = async (e) => {
        try {
            const response = await axios.put(baseApiUrl + uploadDataEndpoint, {
              label_data: labelString,
              image_data: base64Image,
              api_token: apiToken,
              data_point_name: dataPointName,
              project_name: project_name
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
        <div className="add-class-div">
            <p>Adding a Singular Data Point</p>
            <button onClick={handleMore}>(Enter More)</button>
            <p>Adding new data point for {project_name}</p>
            <p>Input an image file: </p>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
            />
            <p>Enter label information with no spaces, seperated by the '|' character</p>
            <input
                type="text"
                id="labelString"
                value={labelString}
                onChange={handleLabelStringChange}
            />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Save</button>
        </div>
    );
};

export default AddData;
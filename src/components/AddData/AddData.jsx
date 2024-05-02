import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseApiUrl, uploadClassEndpoint, uploadDataEndpoint, uploadProjectEndpoint } from '../../config';
import axios from 'axios';
import './adddata.css'

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
        <div className="formadd">
            <div className="add-data-div">
            <div class="row">
                <p className="add-data-info-multi">Adding a Singular Data Point</p>
                <button className="button-switch" onClick={handleMore}>(Enter More)</button>
            </div>
            <p className='add-header'>Adding new data point for {project_name}</p>
            <p className='image-label'>Input an image file: </p>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
            />
            <p className='label-label'>Enter label information with no spaces, seperated by the '|' character</p>
            <input
                type="text"
                id="labelString"
                value={labelString}
                onChange={handleLabelStringChange}
            />
            <div class="row">
                <button className="cancel" onClick={handleCancel}>Cancel</button>
                <button className="save" onClick={handleSubmit}>Save</button>
            </div>
            </div>
        </div>
    );
};

export default AddData;
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseApiUrl, uploadClassEndpoint, uploadDataEndpoint, uploadProjectEndpoint } from '../config';
import axios from 'axios';

const AddDatas = ({apiToken}) => {
    const {project_name} = useParams();

    const [base64Image, setBase64Image] = useState(null);
    const [labels, setLabels] = useState(null)

    const navigate = useNavigate();

    const handleCancel = (e) => {
        navigate("/dashboard")
    }

    const handleSingle = (e) => {
        navigate(`/adddata/${project_name}`)
    }

    const handleImagesUpload = (e) => {
        var base64_dictionary = {}
        const files = e.target.files

        for (var i = 0; i < files.length; i++) {
            const fileName = files[i].name.substring(0, files[i].name.lastIndexOf('.'))
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                const base64WithoutPrefix = base64String.split(',')[1];
                base64_dictionary[fileName] = base64WithoutPrefix;
                console.log(fileName)
            }

            reader.readAsDataURL(files[i]);
        }

        setBase64Image(base64_dictionary)

    }

    const handleTextFilesUpload = (e) => {
        let labels_dictionary = {}
        const files = e.target.files;
    
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
    
          reader.onload = (e) => {
            const fileContent = e.target.result;
            const lines = fileContent.split('\n');
            let label_line = ""
            for (let j = 0; j < lines.length; j++) {
                label_line += (lines[j] + '|')
            }
            let trimmedStr = label_line.replace(/\|+$/, '');
            labels_dictionary[file.name.substring(0, file.name.lastIndexOf('.'))] = trimmedStr
          };
    
          reader.readAsText(file);
        }
        setLabels(labels_dictionary)
    }

    const handleSubmit = async (e) => {
        /* CHECK SAME SIZE AND KEYS */
        const label_keys = Object.keys(labels);
        const base64_keys = Object.keys(base64Image);
        if (label_keys.length !== base64_keys.length) {
            return; // we cannot work with this
        }
        for (let i = 0; i < label_keys.length; i++) {
            if (!base64Image.hasOwnProperty(label_keys[i])) {
                return; // we cannot work with this
            }
        }
        /* FOR EACH KEY, PERFORM API UPLOAD IF POSSIBLE */
        for (let i = 0; i < label_keys.length; i++) {
            const key = label_keys[i];
            const image_data = base64Image[key]
            const label_data = labels[key]
            try {
                const response = await axios.put(baseApiUrl + uploadDataEndpoint, {
                    label_data: label_data,
                    image_data: image_data,
                    api_token: apiToken,
                    data_point_name: key,
                    project_name: project_name
                });
                console.log("Here is API response")
                console.log(response)
            }
            catch (e) {
                console.log(e.response)
            }
        }
        navigate("/dashboard")
    }

    return (
        <div className="add-class-div">
            <p>Adding Multiple Data Points</p>
            <button onClick={handleSingle}>(Enter Single)</button>
            <p>Adding new data points for {project_name}</p>
            <p>Input image files: </p>
            <input 
                type="file" 
                accept="image/*" 
                multiple
                onChange={handleImagesUpload} 
            />
            <p>Input corresponding text files: </p>
            <input 
                type="file" 
                accept="text/plain" 
                multiple
                onChange={handleTextFilesUpload} 
            />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Save</button>
        </div>
    );
};

export default AddDatas;
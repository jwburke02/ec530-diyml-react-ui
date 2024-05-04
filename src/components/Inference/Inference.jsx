import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseApiUrl, inferenceEndpoint, uploadClassEndpoint, uploadDataEndpoint, uploadProjectEndpoint } from '../../config';
import axios from 'axios';
import './inference.css'

const Inference = ({home, apiToken}) => {
    const {project_name} = useParams();

    const [outputInference, setOutputInference] = useState(null);
    const [base64Image, setBase64Image] = useState("");

    const navigate = useNavigate();

    const handleCancel = (e) => {
        if(home) {
            navigate("/")
        }
        else {
            navigate("/dashboard")
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
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

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
      };

    const handleInfer = async (e) => {
        try {
            const response = await axios.post(baseApiUrl + inferenceEndpoint, {
              image_data: base64Image,
              api_token: apiToken,
              project_name: project_name
          });
            const mapping = response.data['inference_mapping']
            while (true) {
                await sleep(2000)
                try {
                    const response = await axios.get(baseApiUrl + inferenceEndpoint + `?inference_mapping=${mapping}`)
                    if (response.status == 200) {
                        console.log("Collected inference response.")
                        setOutputInference(response.data)
                        break;
                    }
                }
                catch (e) {
                    console.log("Did not get inference response yet.")
                    continue;
                }
            }
          }
          catch (e) {
            console.log(e.response)
          }
    }

    const coordsToString = (coords) => {
        return `[${Math.trunc(coords[0])}, ${Math.trunc(coords[1])}, ${Math.trunc(coords[2])}, ${Math.trunc(coords[3])}]`
    }

    return (
        <div id="infer-div">
            <p id="infer-title">Using {project_name} to make an inference</p>
            <p id="infer-input-prompt">Input an image file: </p>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
            />
            <div id="button-hold">
                <button id="cancel-button" onClick={handleCancel}>Cancel</button>
                <button id="infer-button" onClick={handleInfer}>Infer</button>
            </div>
            {outputInference == null ? <></> :
            <>
                {Array.isArray(outputInference) & outputInference[0] == "Nothing was " ? <p>Nothing was found inside of the image.</p> : 
                <>
                    {console.log(outputInference)}
                    {outputInference.map((detection, index) => (
                        <div class="detect-conf-div">
                            <p class="detection">Detected Object: {detection['classification']}</p>
                            <p class="conf">Confidence Score: {detection['confidence']}</p>
                            <p class="location">Location: {coordsToString(detection['coords'])}</p>
                        </div>
                    ))}
                </>
                }
            </>
            }
        </div>
    );
};

export default Inference;
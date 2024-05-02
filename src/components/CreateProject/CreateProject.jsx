import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseApiUrl, uploadProjectEndpoint } from '../../config';
import axios from 'axios';
import './createProject.css'

const CreateProject = ({apiToken}) => {
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('Classification'); // Assuming classification options would be fetched from somewhere

  const navigate = useNavigate();

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectTypeChange = (e) => {
    setProjectType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here 
    try {
      const response = await axios.put(baseApiUrl + uploadProjectEndpoint, {
        project_name: projectName,
        project_type: projectType,
        api_token: apiToken
    });
      console.log("Here is API response")
      console.log(response)
    }
    catch (e) {
      console.log(e.response)
    }
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <div class="label-hold">
        <label class="label" htmlFor="projectName">Project Name</label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={handleProjectNameChange}
        />
      </div>
      <div class="label-hold">
        <label class="label" htmlFor="projectType">Project Type</label>
        <select
          id="projectType"
          value={projectType}
          onChange={handleProjectTypeChange}
        >
          <option value="Classification">Classification</option>
          <option value="Object Detection">Object Detection</option>
        </select>
      </div>
      <div id="button-hold">
        <button id="cancel" type="button" onClick={handleCancel}>Cancel</button>
        <button id="submit" type="submit" onClick={handleSubmit}>Create Project</button>
      </div>
    </form>
  );
};

export default CreateProject;
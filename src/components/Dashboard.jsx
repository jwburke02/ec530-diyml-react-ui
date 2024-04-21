import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseApiUrl, uploadProjectEndpoint } from '../config';

/*
  Dashboard Component
  - Displays all possible projects to user, allowing them to select one to add data to or delete (or modify)
  - Offers create project modal
*/

const Dashboard = ({username, apiToken}) => {
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate();

  const fetchDataAsync = async () => {
    try {
      const response = await axios.get(baseApiUrl + uploadProjectEndpoint + `?username=${username}`);
      setProjectData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [username]); 

  const onDeleteProject = async (e, project_name) => {
    try {
      const response = await axios.patch(baseApiUrl + uploadProjectEndpoint, {
        project_name: project_name,
        api_token: apiToken
      });
      console.log(response.data)
      fetchDataAsync();
    } catch (error) {
      console.error('Error - ', error);
    }
  }

  return (
    <div id="main-dashboard-div">
      <h1 id="dashboard-project-title">{username}'s Projects!</h1>
      <button onClick={() => {navigate("/createproject")}} id="dashboard-create-project-button">Create new project</button>
      {projectData != [] ? <>{projectData.map((project, index) => (
        <>
        <div className="dash-project-div" key={index}>
          <p className="dash-project-name">{project['project_name']}</p>
          <p className="dash-project-type">{project['project_type'][0].toUpperCase() + project['project_type'].slice(1)}</p>
          {project['is_published'] ? <p className="dash-project-published">Published</p> : 
          <p className="dash-project-published">Not published</p>}
          {project['classes'].length < 1 ? <p class="dash-project-classes">No classes defined yet.</p> : 
          project['classes'].map((class_name, idx) => (<p key={idx} class="dash-project-classes">{class_name}</p>))
          }
          <button class="dash-project-button-modify-classes">Add Classes</button>
          <button onClick={(e) => onDeleteProject(e, project['project_name'])} class="dash-project-button-delete-project">Delete Project</button>
        </div>
        </>
      ))}</> : <>No projects yet...</>}
    </div>
  );
};

export default Dashboard;
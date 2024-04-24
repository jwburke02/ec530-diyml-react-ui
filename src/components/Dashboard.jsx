import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseApiUrl, trainEndpoint, uploadClassEndpoint, uploadProjectEndpoint } from '../config';

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

  const stringFromClassList = (class_list) => {
    var newString = ""
    for (var i = 0; i < class_list.length; i++) {
      if (i != class_list.length - 1) {
        newString += (class_list[i] + ', ');
      }
      else {
        newString += class_list[i];
      }
    }
    return newString;
  }

  const onDeleteClasses = async(e, project_name) => {
    try {
      const response = await axios.patch(baseApiUrl + uploadClassEndpoint, {
        project_name: project_name,
        api_token: apiToken
      });
      console.log(response.data)
      fetchDataAsync();
    } catch (error) {
      console.error('Error - ', error);
    }
  }

  const onTrainProject = async(e, project_name) => {
    try {
      const response = await axios.put(baseApiUrl + trainEndpoint, {
        project_name: project_name,
        api_token: apiToken,
        train_split: 0.80,
        epochs: 25
      })
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
        <div className="dash-proj-div-cont">
        <div className="dash-project-div" key={index}>
          <p className="dash-project-name">{project['project_name']}</p>
          <p className="dash-project-type">{project['project_type'][0].toUpperCase() + project['project_type'].slice(1)}</p>
          {project['is_published'] ? <p className="dash-project-published">Published</p> : 
          <p className="dash-project-published">Not published</p>}
          {project['classes'].length < 1 ? <button onClick={() => {navigate(`/addclasses/${project.project_name}`)}} class="dash-project-button-modify-classes">Add Classes</button> : 
          <>
          <p class="dash-project-class-heading">Classes:</p>
          <p class="dash-project-classes">{stringFromClassList(project['classes'])}</p>
          <button onClick={(e) => onDeleteClasses(e, project['project_name'])} class="dash-project-button-delete-classes">Delete Classes</button>
          </>
          }
          <button onClick={(e) => onDeleteProject(e, project['project_name'])} class="dash-project-button-delete-project">Delete Project</button>
        </div>
        <div className="dash-proj-button-hold">
          <button onClick={() => {navigate(`/adddata/${project.project_name}`)}} className="dash-project-add-data-button">Add Data to Project</button>
          <button onClick={(e) => {onTrainProject(e, project['project_name'])}} className="dash-project-train-button">Train Project</button>
          {project['current_url'] != "NONE" ? <button onClick={() => {navigate(`/inference/${project.project_name}`)}} className="dash-project-infer-button">Make Inference</button> : <></>}
        </div>
        </div>
      ))}</> : <>No projects yet...</>}
    </div>
  );
};

export default Dashboard;
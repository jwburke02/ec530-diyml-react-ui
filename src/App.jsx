import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import CreateProject from './components/CreateProject'
import AddClasses from './components/AddClasses'
import AddData from './components/AddData'
import AddDatas from './components/AddDatas'
import Inference from './components/Inference'

function App() {
  const [username, setUsername] = React.useState(null);
  const [apiToken, setApiToken] = React.useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home username={username} apiToken={apiToken} setUsername={setUsername} setApiToken={setApiToken}/>} />
        <Route path="/dashboard" element={<Dashboard username={username} apiToken={apiToken} />} />
        <Route path="/createproject" element={<CreateProject apiToken={apiToken}/>} />
        <Route path="/addclasses/:project_name" element={<AddClasses apiToken={apiToken} />} />
        <Route path="/adddata/:project_name" element={<AddData apiToken={apiToken} />} />
        <Route path="/adddatas/:project_name" element={<AddDatas apiToken={apiToken} />} />
        <Route path="/inference/:project_name" element={<Inference apiToken={apiToken} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
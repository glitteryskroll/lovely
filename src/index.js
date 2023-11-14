import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';



import './css/reset.css';
import './css/common.css';
import Registration from './pages/registration';
import Registration_step_2 from './pages/registration-step-2';
import Registration_step_3 from './pages/registration-step-3';
import Registration_step_4 from './pages/registration-step-4';
import Registration_step_5 from './pages/registration-step-5';
import Registration_step_6 from './pages/registration-step-6';
import Registration_step_7 from './pages/registration-step-7';
import Profile from './pages/profile';
import Profile_edit from './pages/profile-edit';
import Feed from './pages/feed';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Registration /> */}
    {/* <Registration_step_2></Registration_step_2> */}
    {/* <Registration_step_3></Registration_step_3> */}
    {/* <Registration_step_4></Registration_step_4> */}
    {/* <Registration_step_5></Registration_step_5> */}
    {/* <Registration_step_6></Registration_step_6> */}
    {/* <Registration_step_7></Registration_step_7> */}
    {/* <Profile></Profile> */}
    {/* <Profile_edit></Profile_edit> */}
    <Feed></Feed>
  </React.StrictMode>
);


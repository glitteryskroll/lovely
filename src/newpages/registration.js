import { registration } from '../api/UserApi';
import Header from '../newcomponents/header';
import Registration_step_1 from '../newcomponents/registration/page-1';
import Registration_step_2 from '../newcomponents/registration/page-2';
import Registration_step_3 from '../newcomponents/registration/page-3';
import Registration_step_4 from '../newcomponents/registration/page-4';
import Registration_step_5 from '../newcomponents/registration/page-5';
import Registration_step_6 from '../newcomponents/registration/page-6';
import Registration_step_7 from '../newcomponents/registration/page-7';
import logoImg from '../styles/img/Group 1948757223.svg'
import React, { useEffect, useState } from 'react';

const formData = {'name':'', 'gender': '', 'avatar': '','city':'', 'date': '', 'interests': [], 'type': NaN};

const NEWREGISTRATION = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
    
  const createAccount = async (event) => {
      console.log(formData);
      event.preventDefault();
      await registration(formData);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    console.log(formData);
  };

  useEffect(()=>{console.log(currentPage)},[currentPage])

  const handleBack = () => {
      setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{height:'100%'}}>
      <Header></Header>
      {currentPage === 1 && <Registration_step_1 onBack={handleBack} onNext={handleNext} formData={formData} />}
      {currentPage === 2 && <Registration_step_2 onBack={handleBack} onNext={handleNext} formData={formData} />}
      {currentPage === 3 && <Registration_step_3 onBack={handleBack} onNext={handleNext} formData={formData} />}
      {currentPage === 4 && <Registration_step_4 onBack={handleBack} onNext={handleNext} formData={formData} />}
      {currentPage === 5 && <Registration_step_5 onBack={handleBack} onNext={handleNext} formData={formData} />}
      {currentPage === 6 && <Registration_step_6 onBack={handleBack} onNext={handleNext} formData={formData} />}
      {currentPage === 7 && <Registration_step_7 onBack={handleBack} createAccount={createAccount} formData={formData} />}
    </div>
  );

}




export default NEWREGISTRATION;

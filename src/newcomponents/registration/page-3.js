import { useEffect, useState } from 'react';
import backImg from '../../styles/img/back-btn.svg'

const Registration_step_3= ({ onBack, onNext, formData}) => {
  const [city, setCity] = useState(formData['city']);

  useEffect(()=>{
      formData['city'] = city
  },[city]);

  return (
    <main className='main-register'>
      <button className='back-btn' onClick={onBack}>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Где вы проживаете?</h1>
        <div className='name-registration-container'>
          <input value={city} type="text" name='name-registration' alue={city} onChange={(e) => setCity(e.target.value)} placeholder='Город' className='input-registration'/>
        </div>
        <button onClick={onNext} className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_3;

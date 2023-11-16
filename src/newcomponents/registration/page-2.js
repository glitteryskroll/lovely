import { useEffect, useState } from 'react';
import backImg from '../../styles/img/back-btn.svg'

const Registration_step_2= ({ onBack, onNext, formData}) => {
  const [date, setDate] = useState(formData['date']);

  useEffect(()=>{
      formData['date'] = date
  },[date]);

  return (
    <main className='main-register'>
      <button className='back-btn' onClick={onBack}>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Ваша дата рождения</h1>
        <div className='name-registration-container'>
          <input type="date" name='name-registration' value={date} onChange={(e) => setDate(e.target.value)} defaultValue="2007-06-01" className='input-registration'/>
          <label htmlFor="name-registration">Ваш возраст в Lovely</label>
        </div>
        <button onClick={onNext} className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_2;

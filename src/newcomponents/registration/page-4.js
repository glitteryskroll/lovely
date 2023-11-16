import { useEffect, useState } from 'react';
import backImg from '../../styles/img/back-btn.svg'

const Registration_step_4= ({ onBack, onNext, formData}) => {
  const [gender, setGender] = useState(formData['gender']);

  useEffect(()=>{
      formData['gender'] = gender
  },[gender]);

  return (
    <main className='main-register'>
      <button className='back-btn' onClick={onBack}>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Ваш пол</h1>
        <div className='name-registration-container'>
          {/* <input type="radio" name='name-registration' placeholder='Город' className='input-registration'/> */}
          <div class="form_radio_btn">
              <input onChange={(e) => setGender(e.target.value)} checked={gender == 'Мужской' ? 'checked' : ''} id="radio-1" type="radio" name="radio" value="Мужской" className='male-sex' />
              <label for="radio-1">Мужской</label>
          </div>
          <div class="form_radio_btn">
              <input onChange={(e) => setGender(e.target.value)} checked={gender == 'Женский' ? 'checked' : ''} id="radio-2" type="radio" name="radio" value="Женский" className='female-sex' />
              <label for="radio-2">Женский</label>
          </div>
        </div>
        <button onClick={onNext} className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_4;

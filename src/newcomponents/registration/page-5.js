import { useEffect, useState } from 'react';
import backImg from '../../styles/img/back-btn.svg';
import addImg from '../../styles/img/add-img.svg';

let wrapper = document.querySelector('.img__wrapper'); 


const Registration_step_5= ({ onBack, onNext, formData}) => {
  const [avatar, setAvatar] = useState(formData['avatar']);

  useEffect(()=>{
      formData['avatar'] = avatar
  },[avatar]);


  function download(event){
    const input = event.target;
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        let img = document.createElement('img');
        img.src = reader.result;
        setAvatar(img.src);
    }
}

  return (
    <main className='main-register'>
      <button className='back-btn' onClick={onBack}>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Ваша фотография</h1>
        <div className='file-registration-container'>
          <div class="img__wrapper">
            <img src={avatar}></img>
          </div>
          <input onChange={download} type="file" name='input-file-registration' id="input-file-registration" placeholder='Город' className='input-registration'/>
          <label for="input-file-registration"><img src={addImg} alt="" /></label> 
        </div>
        <button onClick={onNext} className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_5;

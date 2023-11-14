import Header from '../components/header';
import backImg from '../img/back-btn.svg'

const Registration_step_4= () => {
  return (
    <main className='main'>
      <Header></Header>
      <button className='back-btn'>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Ваш пол</h1>
        <div className='name-registration-container'>
          {/* <input type="radio" name='name-registration' placeholder='Город' className='input-registration'/> */}
          <div class="form_radio_btn">
              <input id="radio-1" type="radio" name="radio" value="Мужской" className='male-sex' />
              <label for="radio-1">Мужской</label>
          </div>
          <div class="form_radio_btn">
              <input id="radio-2" type="radio" name="radio" value="Женский" className='female-sex' />
              <label for="radio-2">Женский</label>
          </div>
        </div>
        <button className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_4;

import Header from '../components/header';
import backImg from '../img/back-btn.svg'

const Registration_step_3= () => {
  return (
    <main className='main-register'>
      <Header></Header>
      <button className='back-btn'>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Где вы проживаете?</h1>
        <div className='name-registration-container'>
          <input type="text" name='name-registration' placeholder='Город' className='input-registration'/>
        </div>
        <button className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_3;

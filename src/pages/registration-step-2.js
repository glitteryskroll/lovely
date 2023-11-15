import Header from '../components/header';
import backImg from '../img/back-btn.svg'

const Registration_step_2= () => {
  return (
    <main className='main-register'>
      <Header></Header>
      <button className='back-btn'>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Ваша дата рождения</h1>
        <div className='name-registration-container'>
          <input type="date" name='name-registration' className='input-registration'/>
          <label htmlFor="name-registration">Ваш возраст в Lovely</label>
        </div>
        <button className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_2;

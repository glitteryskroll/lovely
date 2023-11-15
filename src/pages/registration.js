import Header from '../components/header';
import logoImg from '../img/Group 1948757223.svg'

const Registration= () => {
  return (
    <main className='main-register'>
      <Header></Header>
      <form action="" className='form-registration'>
        <h1>Как вас зовут?</h1>
        <div className='name-registration-container'>
          <input type="text" placeholder='Иван' name='name-registration' className='input-registration'/>
          <label htmlFor="name-registration">Ваше имя в Lovely</label>
        </div>
        <button className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration;

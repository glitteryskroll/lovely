import logoImg from './img/Group 1948757223.svg'

function App() {
  return (
    <main className='main'>
      <header className='header'>
        <img src={logoImg} alt="logo" />
        <span className='logo-text'>lovely</span>
      </header>
      <form action="" className='form-registration-step-1'>
        <h1>Как вас зовут?</h1>
        <div className='name-registration-container'>
          <input type="text" placeholder='Иван' name='name-registration' className='input-registration'/>
          <label htmlFor="name-registration">Ваше имя в lovely</label>
        </div>
        <button className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );
}




export default App;

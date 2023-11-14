import Header from '../components/header';
import backImg from '../img/back-btn.svg';
import addImg from '../img/add-img.svg';
import deleteItem from '../img/delete-item.svg';

const Registration_step_6= () => {
  return (
    <main className='main'>
      <Header></Header>
      <button className='back-btn'>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Выберите ваши увлечения</h1>
        <div className='interests-registration-container'>
          <div className='interests-item'>Хоббихорсинг <img src={deleteItem} alt="" /> </div>
          <div className='interests-item'>Игры <img src={deleteItem} alt="" /> </div>
          <div className='interests-item'>Программирование <img src={deleteItem} alt="" /> </div>
          <input type="text" placeholder='Увлечение' name='name-registration' className='interests-input-registration'/>
        </div>
        <button className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_6;

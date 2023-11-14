import Header from '../components/header';
import backImg from '../img/back-btn.svg';
import addImg from '../img/add-img.svg';
import deleteItem from '../img/delete-item.svg';

const Registration_step_7= () => {
  return (
    <main className='main'>
      <Header></Header>
      <button className='back-btn'>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Тип отношений</h1>
        <div className='name-registration-container'>
          <select name="" id="" className='type-relationship'>
            <option value="">Друзья</option>
            <option value="">Долгосрочные отношения</option>
            <option value="">Полигамные долгосрочные отношения</option>
            <option value="">Дружба с привилегиями</option>
            <option value="">Секс на одну ночь</option>
          </select>
        </div>
        <button className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_7;

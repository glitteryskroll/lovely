import Footer from '../components/footer';
import Header from '../components/header';
import backImg from '../img/back-btn.svg';
import deleteItem from '../img/delete-item.svg';
// console.log(confirm('s'))
const Profile_edit= () => {
  return (
    <main className='main'>
      
        <h1 className='section-text'>
          Профиль
        </h1>
        <div className='profile-back-btn'></div>
        <div className='profile-img-edit-btn'></div>
        <div className="profile-img">
        <img src="./IMG_5718.JPG" alt="" />
          <div className="profile-img-info">
            <span>Андрей,<span className='profile-img-age' >17</span></span>
            <span className='profile-img-city' >Москва</span>
          </div>
        </div>
        <h2 className='profile-header-text'>Имя</h2>
        <input type="text" placeholder='Андрей'  className='profile-edit-input' />
        <h2 className='profile-header-text'>Город</h2>
        <input type="text" placeholder='Москва'  className='profile-edit-input' />
        <h2 className='profile-header-text'>Возраст</h2>
        <input type="date" value='01.01.2000' className='profile-edit-input' />
        <h2 className='profile-header-text'>О себе</h2>
      <textarea className='profile-edit-textarea'>Меня зовут Миша Боровой, мне 11 лет. Я живу в городе Ставрополь, </textarea>
      <h2 className='profile-header-text'>Увлечения</h2>
      <div className='interests-registration-container'>
          <div className='interests-item'>Хоббихорсинг <img src={deleteItem} alt="" /> </div>
          <div className='interests-item'>Игры <img src={deleteItem} alt="" /> </div>
          <div className='interests-item'>Программирование <img src={deleteItem} alt="" /> </div>
          <input type="text" placeholder='Увлечение' list='type-interests' name='name-registration' className='profile-edit-interests'/>
            <datalist id='type-interests'>
            <option value="Программирование"></option>
            <option value="Хоббихорсинг"></option>
            <option value="Игры"></option>
            </datalist>
            
          
          <datalist></datalist>
        </div>
      <h2 style={{marginBottom: 0}} className='profile-header-text'>Тип отношений</h2>
      <div className='name-registration-container'>
          <select name="" id="" className='type-relationship'>
            <option value="">Друзья</option>
            <option value="">Долгосрочные отношения</option>
            <option value="">Полигамные долгосрочные отношения</option>
            <option value="">Дружба с привилегиями</option>
            <option value="">Секс на одну ночь</option>
          </select>
        </div>
      <div className="profile-switch">
        <div>
        <h1>Скрыть профиль</h1>
        <h2>Скрывает профиль из ленты</h2>
        </div>
  
        <label class="switch">
          <input type="checkbox"/>
          <span class="slider round"></span>
        </label>
      </div>
      <button className='access-btn'>
        Применить
      </button>
      <Footer></Footer>
      
    </main>
  );

}




export default Profile_edit;

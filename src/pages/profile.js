import Footer from '../components/footer';
import Header from '../components/header';
import backImg from '../img/back-btn.svg';
import deleteItem from '../img/delete-item.svg';

const Profile= () => {
  return (
    <main className='main'>
      
        <h1 className='section-text'>
          Профиль
        </h1>
        <div className='profile-settings'></div>
        <div className="profile-img">
        <img src="./IMG_5718.JPG" alt="" />
          <div className="profile-img-info">
            <span>Андрей,<span className='profile-img-age' >17</span></span>
            <span className='profile-img-city' >Москва</span>
          </div>
        </div>
        <h2 className='profile-header-text'>О себе</h2>
      <span className='profile-title'>Меня зовут Миша Боровой, мне 11 лет. Я живу в городе Ставрополь, </span>
      <h2 className='profile-header-text'>Увлечения</h2>
      <div className='interests-profile-container'>
          <div className='interests-item'>Хоббихорсинг </div>
          <div className='interests-item'>Игры</div>
          <div className='interests-item'>Программирование</div>
      </div>
      <h2 className='profile-header-text'>Тип отношений: <span className='profile-type-relationship' >Друзья</span></h2>
      <Footer></Footer>
      
    </main>
  );

}




export default Profile;

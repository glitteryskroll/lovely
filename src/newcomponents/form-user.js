
import cityImg from '../styles/img/cityimg.svg';
import geoImg from '../styles/img/geo.svg';
import relationImg from '../styles/img/love.svg';

const Form= () => {
  return (
    <div>
      <button className='profile-settings'>

      </button>
        <div className="form-img">
        <div className="form-info">
          <div className="form-info-item">
            <img src={cityImg} alt="" />
            Москва
          </div>
          <div className="form-info-item">
            <img src={geoImg} alt="" />
            3 км
          </div>
          
          <div className="form-info-item">
            <img src={relationImg} alt="" />
            Дружба
          </div>
        </div>
        <div className="form-interests-container">
          <div className='interests-item'>Хоббихорсинг </div>
          <div className='interests-item'>Игры</div>
          <div className='interests-item'> Программирование</div>
          <div className='interests-item'>Дизайн</div>
          <div className='interests-item'>...</div>
        </div>
        <img src="./IMG_5718.JPG" className='user' alt="" />
        <div className="form-img-info">
          <span>Андрей  <span className='form-img-age' >17 лет</span></span>
          <span className='form-descr'>
            Меня зовут Миша Боровой, мне 11 лет. Я живу в городе Ставрополь
          </span>
        </div>
        <div className="form-btn-container">
            <button className='return-btn'></button>
            <button className='no-btn'></button>
            <button className='yes-btn'></button>
            <button className='premium-yes-btn'></button>
        </div>
      </div>
    </div>
      
  );

}




export default Form;

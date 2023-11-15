import Footer from '../components/footer';
import Form from '../components/form-user';
import Header from '../components/header';
import deleteItem from '../img/delete-item.svg';

const Filter= () => {
  return (
      <div className="filter-container">
        <div className='profile-back-btn'></div>
        <h1 className='section-text'>
          Фильтр поиска
        </h1>
        <h2 className='filter-section-text'>Пол</h2>
        <div className="filter-sex-container">
          <div class="form_radio_btn">
              <input id="radio-1" type="radio" name="radio" value="Мужской" className='male-sex' checked/>
              <label for="radio-1">Мужской</label>
          </div>
          <div class="form_radio_btn">
              <input id="radio-2" type="radio" name="radio" value="Женский" className='female-sex' />
              <label for="radio-2">Женский</label>
          </div>
        </div>
        <div className="filter-age-container">
          <div className="filter-age-value">
            <h2 className='filter-section-text'>Возраст</h2>
            <label htmlFor="age-filter"></label>
          </div>
          <input type="range" id="age-filter" readonly/>
        </div>
        <h2 className='filter-section-text'>Тип отношений</h2> 
        <div className="filter-type-relationship-container">
          <div class="form_radio_btn">
                <input id="relationship-1" type="radio" name="relationship-type" value="friends" className='type-relationship-radio' />
                <label for="relationship-1">Друзья
                  <span>Найти друга или подругу</span>
                </label>
                
          </div>
          <div class="form_radio_btn">
                <input id="relationship-2" type="radio" name="relationship-type" value="ltr" className='type-relationship-radio' />
                <label for="relationship-2">LTR
                <span>Долгосрочные отношения</span>
                </label>
          </div>
          <div class="form_radio_btn">
                <input id="relationship-3" type="radio" name="relationship-type" value="mltr" className='type-relationship-radio' />
                <label for="relationship-3">MLTR
                <span>полигамные долгосрочные отношения</span>
                </label>
          </div>
          <div class="form_radio_btn">
                <input id="relationship-4" type="radio" name="relationship-type" value="fwb" className='type-relationship-radio' />
                <label for="relationship-4">FWB
                <span>Дружба с привилегиями</span>
                </label>
          </div>
          <div class="form_radio_btn">
                <input id="relationship-5" type="radio" name="relationship-type" value="ons" className='type-relationship-radio' />
                <label for="relationship-5">ONS
                <span>Секс на одну ночь</span>
                </label>
          </div>
        </div>

        <h2 className='filter-section-text'>Увлечения</h2>
        <div className='interests-registration-container'>
          <div className='interests-item'>Хоббихорсинг <img src={deleteItem} alt="" /> </div>
          <div className='interests-item'>Игры <img src={deleteItem} alt="" /> </div>
          <div className='interests-item'>Программирование <img src={deleteItem} alt="" /> </div>
          <input type="text" placeholder='Увлечение' name='name-registration' className='interests-input-registration'/>
        </div>

        <div className="filter-range-value">
            <h2 className='filter-section-text'>Радиус поиска</h2>
            <label htmlFor="range-filter"></label>
        </div>
          <input type="range" id="range-filter" readonly/>
        <button className='restart-btn'>
        Сбросить фильтр
      </button>
        <button className='access-btn'>
        Применить
      </button>
      </div>
  );

}




export default Filter;

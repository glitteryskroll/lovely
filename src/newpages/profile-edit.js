import { useEffect, useState } from 'react';
import backImg from '../styles/img/back-btn.svg';
import deleteItem from '../styles/img/delete-item.svg';
import Footer from '../newcomponents/footer';
import Header from '../newcomponents/header';
import { add_profile_photo, delete_profile_photo, edit_profile, edit_profile_photo, edit_user_profile, get_interests, get_types, get_user_interests, profile } from '../api/UserApi';
import axios from 'axios';
import user_urls from '../api/ApiUrls';

const formData = {'name':'', 'city':'', 'age': '','bio':'', 'interests': [], 'type_rel': NaN, 'status': NaN, };

const Profile_edit= () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [ageDate, setAgeDate] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [page, setPage] = useState(1);
  const [imagePage, setImagePage] = useState(0);
  const [interests, setInterests] = useState([]);
  const [bdInterests, setbdInterests] = useState([]);
  const [typeRel, setTypeRel] = useState('');
  const [imageMenuVisible, setImageMenuVisible] = useState(false);
  const [photos,setPhotos] = useState([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(NaN);
  const [status,setStatus] = useState(true);

  // for Form
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formAgeDate, setFormAgeDate] = useState('');
  const [formInterests, setFormInterests] = useState([]);
  const [formType, setFormType] = useState('');
  const [formStatus, setFormStatus] = useState('');
  // end Form


  const fetch_user = async () =>  {
      const data = await profile();
      setPhotos(data.photos);
      setName(data.name);
      setAge(data.age_int);
      setAgeDate(new Date(data.age).toISOString().split('T')[0]);
      setCity(data.city);
      setBio(data.bio);
      const interests = await get_user_interests();
      setInterests(interests.interests);
      setTypeRel(data.relationships);
      setType(data.type_rel)
      setStatus(parseInt(data.status))
      // Form
      setFormBio(data.bio);
      setFormAgeDate(new Date(data.age).toISOString().split('T')[0]);
      setFormInterests(interests.interests);
      setFormType(data.type_rel);
      setFormStatus(parseInt(data.status))
      // EndForm
  }
  
  useEffect(()=>{
    formData['name'] = formName
    formData['city'] = formCity
    formData['age'] =  formAgeDate
    formData['bio'] =  formBio
    formData['interests'] = formInterests
    formData['type_rel'] =  formType
    formData['status'] =  formStatus
    console.log(formData);
  }, [formName, formCity, formBio, formAgeDate, formInterests, formType, formStatus])

  
  useEffect(()=>{
    const f = async ()=>{
      const data = await get_types();
      setTypes(data.interests);
    }
    f();
    
  }, [])


  const handleUpdateType = (e) => {
    const id = types[e.target.selectedIndex].id;
    setFormType(id);
  };

  useEffect(()=>{
       fetch_user()
  }, [])

  useEffect(()=>{
      // URL скрипта на CDNd
      const cdnUrl = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js';

      // Загрузка скрипта
      axios.get(cdnUrl)
      .then(response => {
          // Код ответа будет в response.data
          const script = document.createElement('script');
          script.innerHTML = response.data;
          document.head.appendChild(script);
          const swiperScript = document.createElement('script');
          swiperScript.innerHTML = `
              const swiper = new Swiper(".swiper", {
                  pagination: {
                  el: ".swiper-pagination",
                  },
              });
              
              swiper.on('slideNextTransitionStart', function () {
                  setImagePage(swiper.activeIndex);
              });
              
              swiper.on('slidePrevTransitionStart', function () {
                  setImagePage(swiper.activeIndex);
              });
              
              function appendSlide (newSlide) {
                  swiper.appendSlide(newSlide)
              }
              
              function removeSlides () {
                  swiper.removeAllSlides()
              }

              function getActiveSlide() {
                  setImagePage(swiper.activeIndex);
              }
              
          `;
          document.body.children[1].children[0].appendChild(swiperScript);
          setScriptLoaded(true);
      })
      .catch(error => {
          console.error('Ошибка при загрузке скрипта Swiper:', error);
      });
  }, [])

  useEffect(()=>{
      console.log('photo',photos)
      console.log(scriptLoaded)
      if (scriptLoaded){
          if (photos){
              window.removeSlides()
              photos.map(item=> {
                  const newSlide = document.createElement('div');
                  newSlide.className = 'swiper-slide';
                  newSlide.innerHTML = `<img src=${user_urls.photo + item} alt="" />`;
                  window.appendSlide(newSlide)
              }
          )
      }
      try{
          window.getActiveSlide();
      }catch(e){console.log(e)};
  }
  },[photos, scriptLoaded])

  const changePage = () => {
      setPage(1);
  }

  function download(event){
      const input = event.target;
      let file = input.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
          let img = document.createElement('img');
          img.src = reader.result;
          addPhoto(img.src);
      }
  }

  const addPhoto = async (image) => {
      await add_profile_photo(image, 'profile');
      await fetch_user();
  }

  const deletePhoto = async () => {
      const photo_id = photos[imagePage];
      await delete_profile_photo(photo_id);
      await fetch_user();
  }

  const setMainPhoto = async () => {
      const photo_id = photos[imagePage];
      const type = 'main'
      await edit_profile_photo(photo_id, type);
      await fetch_user();
  }

  const update_profile = async () => {
    const data = await edit_user_profile(formData);
  }

  useEffect(()=>{
    const f = async ()=>{
      const data = await get_interests();
      setbdInterests(data.interests);
    }
    f();
    
  }, [])

  const handleDeleteInterest = (e) => {
    console.log(parseInt(e.target.parentElement.id));
    const id = parseInt(e.target.parentElement.id);
    console.log(id)
    for (var index in formInterests){
      if (formInterests[index].id == id){
        setFormInterests(formInterests.filter(item => item !== formInterests[index]))
        break
      }
    }
  };

  const addInterest =async (e) => {
    const value = e.target.value
    let match_flag = false;
    console.log(value);
    for (var index in formInterests){
      if (formInterests[index].name == value){
        match_flag = true;
      }
    }
    for (var index in bdInterests){
      if (bdInterests[index].name == value){
        console.log(interests)
        let new_array = Array.from(formInterests);
        new_array.push(bdInterests[index])
        if (!match_flag){
          setFormInterests(new_array);
        }
      }
    }
  };

  window.setImagePage = setImagePage


  return (
    <main className='main'>
        <h1 className='section-text'>
          Профиль
        </h1>
        <div className='profile-back-btn'></div>
        <div className='profile-img-edit-btn'></div>
        <div className="profile-img">
        {/* <div class="img-settings" onClick={()=>{setImageMenuVisible(!imageMenuVisible)}} id="img-settings" style={{display:'flex', opacity: 1}}>
              <img src="./img/settings-dots.svg" alt="settings" />
          </div> */}
          {/* <input id="active-index" onChange={(e)=>{console.log(e);setImagePage(e.target.value)}}></input>
          {imageMenuVisible ? 
          <div class="img-settings-container" id="img-settings-container" style={{display:'flex', opacity: 1}}>
              <button onClick={setMainPhoto}>Установить главным фото</button>
              <button onClick={deletePhoto} class="delete">Удалить фото</button>
              <input type="file" onChange={download} id="input-file-registration" class="modal-input-file" />
              <label for="input-file-registration">Загрузить фотографию</label> 
          </div>
          :
          <></>
          } */}
            
        <div class="swiper">
            <div class="swiper-wrapper">
            </div>
            <div class="swiper-pagination"></div>
        </div>
          <div className="profile-img-info">
            <span>{name},<span className='profile-img-age' >{age}</span></span>
            <span className='profile-img-city' >{city}</span>
          </div>
        </div>
        <h2 className='profile-header-text'>Имя</h2>
        <input type="text" placeholder={name} className='profile-edit-input' value={formName} onChange={(e)=>{setFormName(e.target.value)}} />
        <h2 className='profile-header-text'>Город</h2>
        <input type="text" placeholder={city} className='profile-edit-input' value={formCity} onChange={(e)=>{setFormCity(e.target.value)}} />
        <h2 className='profile-header-text'>Возраст</h2>
        <input type="date" className='profile-edit-input' value={formAgeDate} onChange={(e)=>{setFormAgeDate(e.target.value)}} />
        <h2 className='profile-header-text'>О себе</h2>
      <textarea className='profile-edit-textarea' placeholder={bio} value={formBio} onChange={(e)=>{setFormBio(e.target.value)}} ></textarea>
      <h2 className='profile-header-text'>Увлечения</h2>
      <div className='interests-registration-container'>
          {formInterests.map((name, index) =>(
              // <div id={name.id} index={index} className='interests-item'>{name.name} <img src={deleteItem} onClick={handleDeleteInterest} alt="" /> </div>
              <div id={name.id} index={index} className='interests-item'>{name.name} <img src={deleteItem} alt="" onClick={handleDeleteInterest} /></div>
          )
          )}
          <input type="text" placeholder='Увлечение' list='type-interests' name='name-registration' onInput={addInterest} onClick={addInterest} className='profile-edit-interests'/>
            <datalist id='type-interests'>
              {bdInterests.map((name, index) =>(
                  <option id={'interest-' + name.id} index={index} value={name.name}></option>
              )
              )}
            </datalist>
            
          
          <datalist></datalist>
        </div>
      <h2 style={{marginBottom: 0}} className='profile-header-text'>Тип отношений</h2>
      <div className='name-registration-container'>
      <select name="" id="" onChange={handleUpdateType} className='type-relationship'>
            {types.map((name, index) =>(
              <>
                {(formType == name.id) ? 
                  <option id={name.id}  index={index} value={name.name} selected='selected'>{name.name}</option>
                :
                  <option id={name.id}  index={index} value={name.name}>{name.name}</option>
                }
              </>
                
            )
            )}
          </select>
        </div>
      <div className="profile-switch">
        <div>
        <h1>Скрыть профиль</h1>
        <h2>Скрывает профиль из ленты</h2>
        </div>
  
        <label class="switch">
          <input checked={(formStatus) ? '' : "checked"} type="checkbox" onClick={()=>{setFormStatus(!formStatus)}}/>
          <span class="slider round"></span>
        </label>
      </div>
      <button onClick={update_profile} className='access-btn'>
        Применить
      </button>
      <Footer></Footer>
      
    </main>
  );

}




export default Profile_edit;

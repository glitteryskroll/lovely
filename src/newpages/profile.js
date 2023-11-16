import { useEffect, useState } from 'react';
import Footer from '../newcomponents/footer';
import Header from '../newcomponents/header';
import { add_profile_photo, delete_profile_photo, edit_profile_photo, get_user_interests, profile } from '../api/UserApi';
import axios from 'axios';
import user_urls from '../api/ApiUrls';

const NewProfile= () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [page, setPage] = useState(1);
  const [imagePage, setImagePage] = useState(0);
  const [interests, setInterests] = useState([]);
  const [typeRel, setTypeRel] = useState('');
  const [imageMenuVisible, setImageMenuVisible] = useState(false);
  const [photos,setPhotos] = useState([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const fetch_user = async () =>  {
      const data = await profile();
      setPhotos(data.photos);
      setName(data.name);
      setAge(data.age_int);
      setCity(data.city);
      setBio(data.bio);
      const interests = await get_user_interests();
      setInterests(interests.interests);
      setTypeRel(data.relationships);

  }


  useEffect(()=>{
       fetch_user()
  }, [])

  useEffect(()=>{
      // URL скрипта на CDN
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

  window.setImagePage = setImagePage




  return (
    <main className='main'>
        <h1 className='section-text'>
          Профиль
        </h1>
        <div className='profile-settings'></div>
        <div className="profile-img">
        <div class="swiper">
            <div class="swiper-wrapper">
            </div>
            <div class="swiper-pagination"></div>
        </div>
          <div className="profile-img-info">
            <span>{name}, <span className='profile-img-age' >{age}</span></span>
            <span className='profile-img-city' >{city}</span>
          </div>
        </div>
        <h2 className='profile-header-text'>О себе</h2>
      <span className='profile-title'>{bio}</span>
      <h2 className='profile-header-text'>Увлечения</h2>
      <div className='interests-profile-container'>
          {interests.map((name, index) =>(
              // <div id={name.id} index={index} className='interests-item'>{name.name} <img src={deleteItem} onClick={handleDeleteInterest} alt="" /> </div>
              <div className='interests-item'>{name.name} </div>
          )
          )}
      </div>
      <h2 className='profile-header-text'>Тип отношений: <span className='profile-type-relationship' >{typeRel}</span></h2>
      <Footer></Footer>
      
    </main>
  );

}




export default NewProfile;

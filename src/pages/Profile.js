import React, { useEffect, useState } from 'react';
import { add_profile_photo, delete_profile_photo, edit_profile, edit_profile_photo, profile } from '../api/UserApi';
import { Link } from 'react-router-dom';
import { AUTH_ROUTE } from '../utils/consts';
import config from '../config';
import Menu from '../components/Menu';
import Logo from '../components/Logo';
import ProfileMenu from '../components/ProfileMenu';
import ProfileEdit from '../components/ProfileEdit';
// import '../styles/css/style.css';
import axios from 'axios';
import user_urls from '../api/ApiUrls';

const formData = {'name':'', 'gender': '', 'avatar': '', 'bio':'', 'date': ''};
const Profile = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [page, setPage] = useState(1);
    const [imagePage, setImagePage] = useState(0);
    const [imageMenuVisible, setImageMenuVisible] = useState(false);
    const [photos,setPhotos] = useState([]);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const fetch_user = async () =>  {
        const data = await profile();
        console.log('user',data);
        setPhotos(data.photos);
        setName(data.name);
        setAge(data.age_int);
        setBio(data.bio);
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
        <div>
            {page == 1 ? <Logo></Logo> 
                : 
                <div onClick={changePage} class="menu-back-btn-container" id="menu-back-btn" style={{display:'none', opacity: 0}}>
                    <span class="menu-back-btn">
                    Назад
                    </span>
                </div>
            }
            
            <div class="menu-profile-container">
                <div class="img-settings" onClick={()=>{setImageMenuVisible(!imageMenuVisible)}} id="img-settings" style={{display:'flex', opacity: 1}}>
                    <img src="./img/settings-dots.svg" alt="settings" />
                </div>
                <input id="active-index" onChange={(e)=>{console.log(e);setImagePage(e.target.value)}}></input>
                {imageMenuVisible ? 
                <div class="img-settings-container" id="img-settings-container" style={{display:'flex', opacity: 1}}>
                    <button onClick={setMainPhoto}>Установить главным фото</button>
                    <button>Сменить фотографию</button>
                    <button onClick={deletePhoto} class="delete">Удалить фото</button>
                    <input type="file" onChange={download} id="input-file-registration" class="modal-input-file" />
                    <label for="input-file-registration">Загрузить фотографию</label> 
                </div>
                :
                <></>
                }
                <div className="swiper">
                    <div class="swiper-wrapper"></div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="user-info-container">
                    <div class="user-info">
                        <span class="username">
                            {name}
                        </span>
                        <span class="user-age">{age} лет</span>
                    </div>
                    <div class="user-city">
                        Москва
                    </div>
                </div>
            </div>
            {page == 2 ?
                <ProfileEdit setPage={setPage} name={name} bio={bio} ></ProfileEdit>
            :
                <ProfileMenu setPage={setPage} name={name} bio={bio} ></ProfileMenu>
            }
            <Menu></Menu>
        </div>
    );
};

export default Profile;
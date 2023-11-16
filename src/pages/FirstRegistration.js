import React, { useEffect, useState } from 'react';
import { registration } from '../api/UserApi';
import { Link } from 'react-router-dom';
import { AUTH_ROUTE } from '../utils/consts';

const formData = {'name':'', 'gender': '', 'avatar': '', 'bio':'', 'date': ''};

const Registration = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const createAccount = async (event) => {
        console.log(formData);
        await registration(formData);
    }
    
    
    function Page1({ onBack, onNext}) {
        const [name, setName] = useState(formData['name']);
        useEffect(()=>{
            formData['name'] = name
        },[name]);

        return  (
            <div class="modal-container visible" id="modal-container">
                <div class="input-container">
                    <span class="modal-title">
                        Как вас зовут?
                    </span>
                    <input type="text" class="modal-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Андрей" />
                </div>
                
                {name ? 
                <div class="next-btn" onClick={onNext} id="next-btn">
                    Далее
                </div>
                :
                <div class="next-btn" id="next-btn" style={{background: 'gray'}}>
                    Далее
                </div>
                }
                
                <div class="progress-bar">
                    <img src="./img/progress-bar-1.svg" alt="" />
                </div>
            </div>
        );
    }

    function Page2({ onBack, onNext }) {
        const [date, setDate] = useState(formData['date']);
        useEffect(()=>{
            formData['date'] = date
        },[date]);
        return (
        <div class="modal-container" id="modal-container-2">
            <div class="input-container">
                <span class="modal-title">
                    Дата рождения
                </span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} defaultValue="2007-06-01" class="modal-input" />
            </div>
            {date ? 
                <div class="next-btn" onClick={onNext} id="next-btn">
                    Далее
                </div>
                :
                <div class="next-btn" id="next-btn" style={{background: 'gray'}}>
                    Далее
                </div>
            }
            <span class="back-btn" onClick={onBack} id="back-btn">Назад</span>
            <div class="progress-bar">
                <img src="./img/progress-bar-2.svg" alt=""/>
            </div>
        </div>
        );
    }

    function Page3({ onBack, onNext }) {

        const [gender, setGender] = useState(formData['gender']);
        useEffect(()=>{
            formData['gender'] = gender
            console.log(gender)
        },[gender]);
        
        return (
            <div class="modal-container" id="modal-container-3">
            <div class="input-container">
                <span class="modal-title">
                    Ваш пол
                </span>
            <div class="form_radio_btn">
                <input onChange={(e) => setGender(e.target.value)} id="radio-1" checked={gender == 'Мужской' ? 'checked' : ''} type="radio" name="radio" defaultValue="Мужской" />
                <label for="radio-1">Мужской</label>
            </div>
            
            <div class="form_radio_btn">
                <input onChange={(e) => setGender(e.target.value)} id="radio-2" checked={gender == 'Женский' ? 'checked' : ''} type="radio" name="radio" defaultValue="Женский" />
                <label for="radio-2">Женский</label>
            </div>
            </div>
            {gender ? 
                <div class="next-btn" onClick={onNext} id="next-btn">
                    Далее
                </div>
                :
                <div class="next-btn" id="next-btn" style={{background: 'gray'}}>
                    Далее
                </div>
            }
            <span class="back-btn" onClick={onBack} id="back-btn-2">Назад</span>
            <div class="progress-bar">
                <img src="./img/progress-bar-3.svg" alt=""/>
            </div>
        </div>
        );
    }

    function Page4({ onBack, onNext }) {
        const [avatar, setAvatar] = useState(formData['avatar']);
        useEffect(()=>{
            formData['avatar'] = avatar
            console.log(avatar)
        },[avatar]);

        function download(event){
            const input = event.target;
            let file = input.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                let img = document.createElement('img');
                img.src = reader.result;
                setAvatar(img.src);
            }
        }
        

        return (
            <div class="modal-container" id="modal-container-4">
            <div class="input-container">
                <span class="modal-title">
                    Добавьте фотографию
                </span>
                <div class="img__wrapper">
                    <img src={avatar}></img>
                </div>
                <div class="form_file_btn">
                    <input type="file" onChange={download} id="input-file-registration" class="modal-input-file" />
                    <label for="input-file-registration">Загрузить фотографию</label>    
                </div>
            </div>
            {avatar ? 
                <div class="next-btn" onClick={onNext} id="next-btn">
                    Далее
                </div>
                :
                <div class="next-btn" id="next-btn" style={{background: 'gray'}}>
                    Далее
                </div>
            }
            <span class="back-btn" onClick={onBack} id="back-btn-3">Назад</span>
            <div class="progress-bar">
                <img src="./img/progress-bar-4.svg" alt=""/>
            </div>
        </div>
        );
    }

    function Page5({ onBack, onNext }) {
        const [bio, setBio] = useState(formData['bio']);
        
        useEffect(()=>{
            formData['bio'] = bio
        },[bio]);

        return (
          <div class="modal-container" id="modal-container-5">
            <div class="input-container">
                <span class="modal-title">
                    Расскажите о себе
                </span>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
            </div>
            {bio ? 
            <button class="next-btn" onClick={createAccount} id="next-btn-5" href="/menu.html">
                Начать знакомиться
            </button>  
            :
            <button class="next-btn"  id="next-btn-5" style={{background: 'gray'}} href="/menu.html">
                Начать знакомиться
            </button>  
            }
            
            <span class="back-btn" onClick={onBack} id="back-btn-4">Назад</span>
            <div class="progress-bar">
                <img src="./img/progress-bar-5.svg" alt=""/>
            </div>
        </div>
        );
    }
    

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };
    
    useEffect(()=>{console.log(currentPage)},[currentPage])
    const handleBack = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div>
            <div class="main-logo">
                <img src="./img/Group 1948757223.svg" alt="" />
                <span class="name-logo">
                    Lovely
                </span>
            </div>
            <div className="modal-slider">
                {currentPage === 1 && <Page1 onBack={handleBack} onNext={handleNext}/>}
                {currentPage === 2 && <Page2 onBack={handleBack} onNext={handleNext} />}
                {currentPage === 3 && <Page3 onBack={handleBack} onNext={handleNext} />}
                {currentPage === 4 && <Page4 onBack={handleBack} onNext={handleNext} />}
                {currentPage === 5 && <Page5 onBack={handleBack} onNext={handleNext} />}
            </div>
        </div>
    );
};

export default Registration;
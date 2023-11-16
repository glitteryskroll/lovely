import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { edit_profile} from '../api/UserApi';
import { Link } from 'react-router-dom';
import { SETTINGS_ROUTE } from '../utils/consts';
import { useState } from 'react';

const ProfileEdit = (props) => {
  const [bio, setBio] = useState(props.bio);
  const [name, setName] = useState(props.name);
  
  console.log('pererender');

  useEffect(()=>{
    document.getElementById('settings').style.display = 'block';
    document.getElementById('menu-back-btn').style.display = 'block';
    setTimeout(()=>{
      document.getElementById('settings').style.opacity = 1;
      document.getElementById('menu-back-btn').style.opacity = 1;
    }, 400)
    console.log('0')
  }, [])

  const editProfile = async (e) => {
    e.preventDefault();
    await edit_profile(name, bio);
    console.log(e);
  }

  return (
      <div class="settings-list" id="settings" >
        <form onSubmit={editProfile}>
          <h1 >Профиль</h1>
          <input type="text" placeholder="Имя" value={name} onChange={(e)=>{setName(e.target.value)}} class="profile-settings-input" required/>
          <input type="text" placeholder="Город" class="profile-settings-input" required/>
          <h1>О себе</h1>
          <textarea name="" class="profile-settings-input" onChange={(e)=>{setBio(e.target.value)}} id="" cols="30" rows="10">{bio}</textarea>
          <button type="submit" class="settings-btn-save" style={{width: '100%', border:'0px'}}>
              Сохранить изменения
          </button>
        </form>
      </div>
  );
};

export default ProfileEdit;
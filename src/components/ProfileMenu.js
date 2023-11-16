import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { getAvatarUrl } from '../api/UserApi';
import { Link } from 'react-router-dom';
import { SETTINGS_ROUTE } from '../utils/consts';

const ProfileMenu = (props) => {
    const changePage = () => {
        props.setPage(2);
    }

    useEffect(()=>{
        document.getElementById('menu').style.display = 'block';
        setTimeout(()=>{document.getElementById('menu').style.opacity = 1;}, 200)
    }, [])

    return (
        <div class="menu-list" id="menu">
            <div class="menu-item" id="settings-btn">
                <img src="./img/settings.svg" alt="settings"/>
                <span onClick={changePage}>Изменить профиль</span>
            </div>
            <span class="menu-chapter">Лайки</span>
            <div class="menu-item">
                <img src="./img/like.svg" alt="like"/>
                <span>Мои лайки</span>
            </div>
            <div class="menu-item">
                <img src="./img/dislike.svg" alt="dislie"/>
                <span>Мои дизлайки</span>
            </div>
            <br/>
            <div class="menu-item">
                <img src="./img/burger.svg" alt="burger"/>
                <span>Чёрный список</span>
            </div>
            <div class="menu-item delete">
                <img src="./img/delete.svg" alt="delete"/>
                <span>Удалить анкету</span>
            </div>
        </div>
    );
};

export default ProfileMenu;
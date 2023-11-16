import React, { useContext } from 'react';
import { Context } from '../index';
import { getAvatarUrl } from '../api/UserApi';
import { Link } from 'react-router-dom';
import { SETTINGS_ROUTE } from '../utils/consts';

const Logo = () => {
  return (
    <div class="main-logo">
        <img src="./img/Group 1948757223.svg" alt="" />
        <span class="name-logo">
            Lovely
        </span>
    </div>
  );
};

export default Logo;
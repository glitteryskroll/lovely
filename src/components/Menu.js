import React, { useContext } from 'react';
import { Context } from '../index';
import { getAvatarUrl } from '../api/UserApi';
import { Link } from 'react-router-dom';
import { SETTINGS_ROUTE } from '../utils/consts';

const Menu = () => {
  return (
    <footer class="footer-container">
      <a href="menu.html"><img src="./img/menu.svg" width="30px" alt="" /></a>
      <a href="feed.html"><img src="./img/find.svg" alt="" width="40px" /></a>
      <a href="profile.html"><img src="./img/profile.svg" width="40px" alt="" /></a>
    </footer>
  );
};

export default Menu;
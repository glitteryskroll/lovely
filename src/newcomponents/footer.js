import logoImg from '../styles/img/Group 1948757223.svg';
import profileimg from '../styles/img/avatar.svg';
import findimg from '../styles/img/find.svg';
import starimg from '../styles/img/star.svg'

const Footer= () => {
  return (
      <footer className='footer' >
        <img src={starimg} alt="" />
        <img src={findimg} alt="" />
        <img src={profileimg} alt="" />
      </footer>
  );

}




export default Footer;

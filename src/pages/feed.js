import Footer from '../components/footer';
import Header from '../components/header';
import backImg from '../img/back-btn.svg';
import deleteItem from '../img/delete-item.svg';

const Feed= () => {
  return (
    <main className='main'>
        <Header></Header>
        <div className='profile-settings'></div>
        <div className="form-img">
        <img src="./IMG_5718.JPG" alt="" />
          <div className="profile-img-info">
            <span>Андрей,<span className='profile-img-age' >17</span></span>
            <span className='profile-img-city' >Москва</span>
          </div>
        </div>
      <Footer></Footer>
      
    </main>
  );

}




export default Feed;

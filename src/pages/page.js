import Filter from '../components/filter';
import Footer from '../components/footer';
import Form from '../components/form-user';
import Header from '../components/header';
import Menu from '../components/menu';
import deleteItem from '../img/delete-item.svg';

const Likepage= () => {
  return (
    <main className='main'>
        <Menu></Menu>
        <div className="like-container">
            <div className="user-container">
                <img src="./IMG_5718.JPG" alt="" />
                <span className='user-info'>Андрей  <span className='age' >17</span></span>
            </div>
            <div className="user-container">
                <img src="./IMG_5718.JPG" alt="" />
                <span className='user-info'>Андрей  <span className='age' >17</span></span>
            </div>
            <div className="user-container">
                <img src="./IMG_5718.JPG" alt="" />
                <span className='user-info'>Андрей  <span className='age' >17</span></span>
            </div>
            <div className="user-container">
                <img src="./IMG_5718.JPG" alt="" />
                <span className='user-info'>Андрей  <span className='age' >17</span></span>
            </div>
            <div className="user-container">
                <img src="./IMG_5718.JPG" alt="" />
                <span className='user-info'>Андрей  <span className='age' >17</span></span>
            </div>
            <div className="user-container">
                <img src="./IMG_5718.JPG" alt="" />
                <span className='user-info'>Андрей  <span className='age' >17</span></span>
            </div>
            <div className="user-container">
                <img src="./IMG_5718.JPG" alt="" />
                <span className='user-info'>Андрей  <span className='age' >17</span></span>
            </div>
        </div>

        <Footer></Footer>
      
    </main>
  );

}




export default Likepage;

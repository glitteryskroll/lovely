import Filter from '../newcomponents/filter';
import Footer from '../newcomponents/footer';
import Form from '../newcomponents/form-user';
import Header from '../newcomponents/header';
import Menu from '../newcomponents/menu';
import deleteItem from '../../styles/img/delete-item.svg';

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

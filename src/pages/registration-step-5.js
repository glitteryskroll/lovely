import Header from '../components/header';
import backImg from '../img/back-btn.svg';
import addImg from '../img/add-img.svg';

let wrapper = document.querySelector('.img__wrapper'); 


function download(input){
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
        let img = document.createElement('img');
        wrapper.appendChild(img);
        img.src = reader.result;
    }
}

const Registration_step_5= () => {
  return (
    <main className='main'>
      <Header></Header>
      <button className='back-btn'>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Ваша фотография</h1>
        <div className='file-registration-container'>
          <div class="img__wrapper">
          </div>
          <input type="file" name='input-file-registration' id="input-file-registration" placeholder='Город' className='input-registration'/>
          <label for="input-file-registration"><img src={addImg} alt="" /></label> 
        </div>
        <button className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_5;

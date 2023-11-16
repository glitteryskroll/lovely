import { useEffect, useState } from 'react';
import backImg from '../../styles/img/back-btn.svg';
import addImg from '../../styles/img/add-img.svg';
import deleteItem from '../../styles/img/delete-item.svg';
import { get_interests } from '../../api/UserApi';

const Registration_step_6= ({ onBack, onNext, formData}) => {
  const [interests, setInterests] = useState(formData['interests']);
  const [bdInterests, setbdInterests] = useState([]);

  useEffect(()=>{
      formData['interests'] = interests;
      console.log(interests)
  },[interests]);


  useEffect(()=>{
    console.log(interests)
  },[interests]);

  useEffect(()=>{
    const f = async ()=>{
      const data = await get_interests();
      setbdInterests(data.interests);
      setInterests(data.interests.splice(0,3));
    }
    f();
    
  }, [])

  const handleDeleteInterest = (e) => {
    console.log(parseInt(e.target.parentElement.id));
    const id = parseInt(e.target.parentElement.id);
    console.log(id)
    for (var index in interests){
      if (interests[index].id == id){
        setInterests(interests.filter(item => item !== interests[index]))
        break
      }
    }
  };

  const addInterest =async (e) => {
    const value = e.target.value
    let match_flag = false;
    console.log(value);
    for (var index in interests){
      if (interests[index].name == value){
        match_flag = true;
      }
    }
    for (var index in bdInterests){
      if (bdInterests[index].name == value){
        console.log(interests)
        let new_array = Array.from(interests);
        new_array.push(bdInterests[index])
        if (!match_flag){
          setInterests(new_array);
        }
      }
    }
    console.log('end');
  };

  return (
    <main className='main-register'>
      <button className='back-btn' onClick={onBack}>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Выберите ваши увлечения</h1>
        <div className='interests-registration-container'>
          {interests.map((name, index) =>(
              <div id={name.id} index={index} className='interests-item'>{name.name} <img src={deleteItem} onClick={handleDeleteInterest} alt="" /> </div>
          )
          )}
          <input type="text" placeholder='Увлечение' list='type-interests' name='name-registration' onInput={addInterest} onClick={addInterest} className='interests-input-registration'/>
            <datalist id='type-interests'>
              {bdInterests.map((name, index) =>(
                  <option id={'interest-' + name.id} index={index} value={name.name}></option>
              )
              )}
            </datalist>
        </div>
        <button onClick={onNext} className='btn-registration' >
          <span>Продолжить</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_6;

import { useEffect, useState } from 'react';
import backImg from '../../styles/img/back-btn.svg';
import addImg from '../../styles/img/add-img.svg';
import deleteItem from '../../styles/img/delete-item.svg';
import { get_types } from '../../api/UserApi';

const Registration_step_7= ({ onBack, createAccount, formData}) => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(formData['type']);
  useEffect(()=>{
    const f = async ()=>{
      const data = await get_types();
      setTypes(data.interests);
    }
    f();
    
  }, [])

  useEffect(()=>{
    formData['type'] = type;
    console.log(formData);
  }, [type])  

  const handleUpdateType = (e) => {
    console.log(e.target.selectedIndex);
    const id = types[e.target.selectedIndex].id;
    setType(id);
  };
  return (
    <main className='main-register'>
      <button className='back-btn' onClick={onBack}>
        <img src={backImg} alt="" />
      </button>
      <form action="" className='form-registration'>
        <h1>Тип отношений</h1>
        <div className='name-registration-container'>
          <select name="" id="" onChange={handleUpdateType} className='type-relationship'>
            {types.map((name, index) =>(
              <>
                {(type == name.id) ? 
                  <option id={name.id}  index={index} value={name.name} selected='selected'>{name.name}</option>
                :
                  <option id={name.id}  index={index} value={name.name}>{name.name}</option>
                }
              </>
                
            )
            )}
          </select>
        </div>
        <button onClick={createAccount} className='btn-registration' >
          <span>Начать знакомиться</span>
        </button>
      </form>
    </main>
  );

}




export default Registration_step_7;

import { useEffect, useState } from "react";


const Registration_step_1= ({ onBack, onNext, formData}) => {
    const [name, setName] = useState(formData['name']);
    useEffect(()=>{
        formData['name'] = name
    },[name]);

    return (
        <main className='main-register'>
            <form action="" className='form-registration'>
            <h1>Как вас зовут?</h1>
            <div className='name-registration-container'>
                <input type="text" placeholder='Иван' name='name-registration' value={name} onChange={(e) => setName(e.target.value)} className='input-registration'/>
                <label htmlFor="name-registration">Ваше имя в Lovely</label>
            </div>
            <button onClick={onNext} className='btn-registration' >
                <span>Продолжить</span>
            </button>
            </form>
        </main>
    );

}




export default Registration_step_1;

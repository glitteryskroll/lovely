import config from "../config";
import axios from "axios";
import user_urls from "./ApiUrls";

const apiUrl = config.backendUrl;

export const edit_profile = async (formData) => {
  try {
      const response = await axios.post(user_urls.edit_profile, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true  // for sending credentials (cookies)
      });

      return response.data.user;
  }catch (error) {
      console.error('Error:', error);
  }
};

export const registration = async (formData) => {
  if (formData.gender == 'Мужской')
    formData.gender = 'men'
  else if (formData.gender == 'Женский')
    formData.gender = 'women'
  else
    formData.gender = undefined

  return await fetch(user_urls.registration, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then((response)=>{
        if (response.status == 200){
          return true
        }
        else{
          if (response.status == 409){
            alert('Пользователь с таким email уже имеется');
          }
          else{
            alert(response.status)
          }
          return false
        }
    })
    .catch(error => {
      console.error('Error registering:', error);
    });
};

export const login = async (email, password) => {
  const data = {
      email,
      password
  };

  const response = await axios.post(user_urls.login, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true  // for sending credentials (cookies)
  });
  return response.data
};

export const profile = async () => {
  try {
      const response = await axios.post(`${apiUrl}/user/profile`, null, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data.user;
    } catch (error) {
      console.error('Error:', error);
    }
};
export const photo = () => {}
export const delete_user = async () => {
  return await fetch(user_urls.delete_user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  .then(response => response.json())
  .then(data => {
      console.log('Response from server:', data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
};
export const add_profile_photo = async (photo, type) => {
  const data = {photo: photo, type: type}
  const response = await axios.post(user_urls.add_profile_photo, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true  // for sending credentials (cookies)
  });
  return response.data
}
export const edit_profile_photo = async (photo_id, type) => {
  const data = {photo_id: photo_id, type: type}
  const response = await axios.post(user_urls.edit_profile_photo, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true  // for sending credentials (cookies)
  });
  return response.data
}
export const delete_profile_photo = async (photo_id) => {
  const data = {photo_id: photo_id}
  const response = await axios.post(user_urls.delete_profile_photo, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true  // for sending credentials (cookies)
  });
  return response.data
}
export const add_video = () => {}
export const delete_profile_video = () => {}
export const edit_profile_desc = () => {}
export const edit_profile_status = () => {}
export const get_interests = async () => {
  const data = {interests_type: 'interests'};
  const response = await axios.post(user_urls.get_interests, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true  // for sending credentials (cookies)
  });
  return response.data
}
export const get_types = async () => {
  const data = {interests_type: 'relationships'};
  const response = await axios.post(user_urls.get_interests, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true  // for sending credentials (cookies)
  });
  return response.data
}
export const get_user_interests = async () => {
  const data = {interests_type: 'interests'};
  const response = await axios.post(user_urls.get_user_interests, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true  // for sending credentials (cookies)
  });
  return response.data
}
export const video = () => {}
export const edit_user_interests = () => {}
export const edit_user_profile = async (formData) => {
  try {
    const response = await axios.post(user_urls.edit_user_profile, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.user;
  } catch (error) {
    console.error('Error:', error);
  }

}
export const edit_user_coordinates = () => {}
export const set_like = () => {}
export const set_blacklist = () => {}
export const set_chat = () => {}
export const get_chat = () => {}
export const send_message = () => {}
export const get_user_sympathies = () => {}
export const get_user_chats = () => {}
export const search_users = () => {}
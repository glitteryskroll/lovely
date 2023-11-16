import config from "../config";
const apiUrl = config.backendUrl;
const userUrl = '/user'

let user_urls = {
    edit_profile: '/edit_user_profile',
    registration: "/registration",
    login:  "/login",
    profile: "/profile",
    photo: "/photo/",
    delete_user: "/delete_user",
    add_profile_photo: "/add_profile_photo",
    edit_profile_photo: "/edit_profile_photo",
    delete_profile_photo: "/delete_profile_photo",
    add_video: "/add_video",
    delete_profile_video: "/delete_profile_video",
    edit_profile_desc: "/edit_profile_desc",
    edit_profile_status: "/edit_profile_status",
    get_interests: "/get_interests",
    get_user_interests: "/get_user_interests",
    video: "/video/{id}",
    edit_user_interests: "/edit_user_interests",
    edit_user_profile: "/edit_user_profile",
    edit_user_coordinates: "/edit_user_coordinates",
    set_like: "/set_like",
    set_blacklist: "/set_blacklist",
    set_chat: "/set_chat",
    get_chat:  "/get_chat",
    send_message: "/send_message",
    get_user_sympathies: "/get_user_sympathies",
    get_user_chats: "/get_user_chats",
    search_users: "/search_users"
}

user_urls = Object.fromEntries(
    Object.keys(user_urls).map(key => [key, apiUrl + userUrl + user_urls[key]])
);

export default user_urls;
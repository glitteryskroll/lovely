import AdminPanel from "../pages/AdminPanel";
import Auth from "../pages/Auth";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import FeedApp from "../pages/Feed";
import Post from "../pages/Post";
import Registration from "../pages/FirstRegistration";
import Settings from "../pages/Settings";
import { ADMIN_PANEL, AUTH_ROUTE, CREATE_POST_ROUTE, EDIT_POST, FEED_ROUTE, POST_ROUTE, REGISTER_ROUTE, SETTINGS_ROUTE, PROFILE_ROUTE, NEWREGISTER_ROUTE, NEWPROFILE_EDIT_ROUTE, NEWPROFILE_ROUTE, NEWFEED_ROUTE } from "./consts";
import Profile from "../pages/Profile";
import NEWREGISTRATION from "../newpages/registration";
import Profile_edit from "../newpages/profile-edit";
import NewProfile from "../newpages/profile";
import NEWFEED from "../newpages/feed";

export const AUTH_ROUTES = [
    {
        path: SETTINGS_ROUTE,
        page: Settings
    },
    {
        path: FEED_ROUTE,
        page: FeedApp
    },
    {
        path: POST_ROUTE,
        page: Post
    },
    {
        path: PROFILE_ROUTE,
        page: Profile
    }
]

export const NOT_AUTH_ROUTES = [
    {
        path: AUTH_ROUTE,
        page: Auth
    },
    {
        path: REGISTER_ROUTE,
        page: Registration
    },
    {
        path: NEWREGISTER_ROUTE,
        page: NEWREGISTRATION
    },
    {
        path: NEWPROFILE_EDIT_ROUTE,
        page: Profile_edit
    },
    {
        path: NEWPROFILE_ROUTE,
        page: NewProfile
    },
    {
        path: NEWFEED_ROUTE,
        page: NEWFEED
    }

]

export const ADMIN_ROUTES = [
    {
        path: ADMIN_PANEL,
        page: FeedApp
    },
    {
        path: CREATE_POST_ROUTE,
        page: CreatePost
    },
    {
        path: EDIT_POST,
        page: EditPost
    }
]
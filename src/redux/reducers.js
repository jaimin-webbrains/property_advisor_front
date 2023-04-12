import auth from './auth/reducer';
import themeChanger from './themeChanger/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import themeSetting from './themeSettings/reducer';
import scrumboard from './scrumboard/reducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import property from './property/reducer'
import NetworkCall from './networkCall/reducer';
import master from './master/reducer'

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        themeChanger,
        LanguageSwitcher,
        themeSetting,
        scrumboard,
        property,
        NetworkCall,
        master,
        router: routerReducer,
        ...asyncReducers
    });

export default createReducer;

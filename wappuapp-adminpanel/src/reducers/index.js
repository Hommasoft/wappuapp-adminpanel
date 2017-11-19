import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as authReducer } from './auth';
import { reducer as protectedReducer } from './protected';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  protected: protectedReducer
});

export default rootReducer;

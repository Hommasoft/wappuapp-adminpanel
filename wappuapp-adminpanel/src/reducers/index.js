import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as authReducer } from './auth';
import { reducer as protectedReducer } from './protected';
import { feed as feedReducer } from './feed';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  protected: protectedReducer,
  feed: feedReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as authReducer } from './auth';
import { reducer as eventReducer } from './event';
import { reducer as protectedReducer } from './protected';
import { feed as feedReducer } from './feed';
import { comments as commentsReducer } from './comments.js';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  protected: protectedReducer,
  feed: feedReducer,
  comments: commentsReducer,
  event: eventReducer
});

export default rootReducer;

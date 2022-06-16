import { createStore, applyMiddleware, compose } from "redux";
import { compact } from 'lodash';
import thunk from 'redux-thunk';

const reducer = (state = {count: 20}, action) => {
  switch (action.type) {
    case 'UPDATE': return {...state, ...action.payload};
    case 'DECREASE': return {count: state.count - 1};
    default: return state;
  }
}


const middlewareArr = compact(
  [
    applyMiddleware(thunk), 
    window['__REDUX_DEVTOOLS_EXTENSION__'] &&
    window['__REDUX_DEVTOOLS_EXTENSION__']({
      actionSanitizer: (action) => {
        return {
          ...action,
          type: action.type.toString(),
        };
      },
      trace: true,
      traceLimit: 1000,
    })
]);

const store = createStore(reducer, compose(...middlewareArr));

store.subscribe(() => {
  // console.log(store.getState());
})



export default store;

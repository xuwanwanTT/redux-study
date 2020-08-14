import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions.js';
const { SHOW_ALL } = VisibilityFilters;

const initialState = {
  visibilityFilter: SHOW_ALL, todos: []
};

// 接收 旧的 state 和 改变值 返回新的 state (previousState, action) => newState
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {
        ...state, visibilityFilter: visibilityFilter(state.visibilityFilter, action)
      };
    case ADD_TODO:
    case TOGGLE_TODO:
      return {
        ...state,
        todos: todos(state.todos, action)
      };
    default:
      return state
  }
};

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((s, i) => ({
        text: s.text,
        completed: i === action.index ? !s.completed : s.completed
      }));
    default:
      return state
  }
};

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

// 使用 combineReducers 可以将 todoApp 写成如下格式达到相同目的
todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;

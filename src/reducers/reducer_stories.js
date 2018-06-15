


function storiesReducer(state = [], action) {

	switch (action.type) {

	case 'ADD_STORIES':
      return action.stories;

    default:
      return state;

	}

}

export default storiesReducer;

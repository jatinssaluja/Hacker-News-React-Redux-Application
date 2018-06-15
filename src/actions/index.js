import {addStoriesCall} from '../selectors/story';



export function addStories() {

	const request = addStoriesCall();


	return (dispatch)=> {

      request.then((data)=>{

      dispatch({type:'ADD_STORIES', stories:data});

			});

	};


}

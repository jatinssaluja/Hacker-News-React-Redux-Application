import axios from 'axios';
import _ from 'lodash';

function fetchTopStories(){


return axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');


}

// fetches story or a comment of a particular id
function item(id){


return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);


}


function fetchKarma(username){

   return axios.get(`https://hacker-news.firebaseio.com/v0/user/${username}/karma.json`);

}


function fetchUserSubmittedList(username){


  return  axios.get(`https://hacker-news.firebaseio.com/v0/user/${username}.json`);

}




export function addStoriesCall(){

 let stories = [];

 let finalStories = [];

 let karmaRec = [];

 let promise = Promise.resolve(null);

promise = promise.then(()=>{

		return fetchTopStories();

}).then((data)=>{


		let promises = [];

		data.data.slice(0,10).forEach((value)=>{

				promises.push(item(value));

		}); // end of forEach

		return Promise.all(promises);

	}).then((result)=>{

	 let promises = [];

		result.forEach(({data})=>{
			stories.push(data);
		});

		stories.forEach((story)=>{

				promises.push(fetchKarma(story.by));

		}); // end of forEach

		return Promise.all(promises);

	}).then((karmas)=>{


		karmas.forEach((x)=>{
			karmaRec.push(x.data);

		});


		stories.forEach((story, index)=>{

		 story['karma'] = karmaRec[index];
		 finalStories.push(story);

		});



	}).catch((err)=>{

			console.log('Error', err);

	});



return promise.then(()=>{

 return finalStories;

});

}


export function fetchStoryCall(id){

  let users = [];
  let count = [];// stores the count of comments for each user
  let storyDesc = {};
  let username = '';

 let promise = Promise.resolve(null);

promise = promise.then(()=>{

     return item(id);

}).then((data)=>{


     storyDesc = _.omit(data.data, 'descendants', 'kids');
     username = storyDesc.by;
     storyDesc['comments'] = [];

     let promises = [];

     if(data.data.kids){

     data.data.kids.slice(0,10).forEach((value)=>{

         promises.push(item(value));

     }); // end of forEach

     return Promise.all(promises);

   } else{

     return Promise.resolve(null);
   }

   }).then((result)=>{

     if(result){

     result.forEach((x)=>{

       users.push(x.data.by);
       storyDesc.comments.push(_.omit(x.data, 'kids'));

     });
   }

     return fetchKarma(username);

   }).then((karma)=>{


      storyDesc['karma'] = karma.data;

      if(users.length>0){

      let promises = [];

      users.forEach((user)=>{

           promises.push(fetchUserSubmittedList(user));

      });

      return Promise.all(promises);

    } else {

      return Promise.resolve(null);

    }

  }).then((result)=>{

        if(result){
         result.forEach((x)=>{

              count.push(x.data.submitted.length);

         });
       }

   }).catch((err)=>{

       console.log('Error', err);

   });


return promise.then(()=>{

    return {storyDesc, count};

});

}

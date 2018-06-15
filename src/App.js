import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {


 constructor(){

  super();

 this.storyId = [];
 this.finalStories = [];
 this.karmas = [];


 }


 fetchKarma(story){

    return new Promise((resolve)=>{

     axios.get(`https://hacker-news.firebaseio.com/v0/user/${story.by}/karma.json`).
     then((karma)=>{

      this.karmas.push(karma.data);
      story['karma'] = karma.data;
      this.finalStories.push(story);
      resolve();


    });

  });

}


  fetchStories(){


  const promises = [];
  
  for(let i=0;i<2;i++)
  {

    const p = new Promise((resolve)=>{


      axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.storyId[i]}.json`).
      then((data)=>{

       promises.push(this.fetchKarma(data.data));
       resolve();


     });

   });

    promises.push(p);

  }

  Promise.all(promises).then((data)=>{

  /*console.log(promises.length);
  console.log('All stories fetched');
  console.log(stories);*/

  console.log('All Final stories fetched');
  console.log(this.finalStories);



  });

  }


   componentDidMount(){

     axios.get('https://hacker-news.firebaseio.com/v0/topstories.json').
     then((data)=>{

      this.storyId = data.data.slice(0,10);
      console.log(this.storyId);
      this.fetchStories();


    });

   }


  render() {
    return (
      <div>
        <h1> Hello World</h1>
      </div>
    );
  }
}

export default App;

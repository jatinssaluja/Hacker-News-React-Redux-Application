import React, { Component } from 'react';
import _ from 'lodash';
import {fetchStoryCall} from '../selectors/story';

class StoryShow extends Component {


 constructor(props){

  super(props);

  this.state = {storyDetail:{}, commentsCount:[]};

 }


 renderHumanReadableDate(time){


   const date = new Date(time*1000).getDate();
   const month = new Date(time*1000).getMonth()+1;
   const year = new Date(time*1000).getFullYear();
   const original_date = month+'/'+date+'/'+year;
   const options = {weekday:'long', year:'numeric', day:'numeric', month:'long'};
   const formatted_date = (new Date(original_date)).toLocaleDateString('en-US', options);

   return formatted_date;

 }


 renderComments(){

   if(this.state.storyDetail.comments.length>0){

   return this.state.storyDetail.comments.map(({id, by, text, time}, index)=>{


         const formatted_date = this.renderHumanReadableDate(time);

         return (

                 <div key ={id} className="list-group-item list-group-item-action flex-column align-items-start">

                   <p  className="mb-1"><span style = {{color:'red'}}>Author:</span> {by}</p>
                   <p className="mb-1"><span style = {{color:'red'}}>Comment: </span>
                     <br/>
                     <span dangerouslySetInnerHTML = {{__html: text}} />

                   </p>
                  <p className="mb-1"><span style = {{color:'red'}}>Comment Created:</span>{formatted_date}</p>
                   <p  className="mb-1"><span style = {{color:'red'}}>Total comments submitted by Author:</span> {this.state.commentsCount[index]}</p>

              </div>

         );

   });

 } else{

    return (<h3>No comments exist for this story</h3>);


 }



 }


   componentDidMount(){

      const {id} = this.props.match.params;

      fetchStoryCall(id).then(({storyDesc, count})=>{

        this.setState(()=>{

          return {storyDetail: storyDesc, commentsCount:count};

        });


      });

   }



  render() {


   if(_.isEmpty(this.state.storyDetail)){

     return (
       <div>
         <h1>Data Loading...</h1>
       </div>
     );

   }

  else{

   const {by, score, time, title, karma} = this.state.storyDetail;

   const formatted_date = this.renderHumanReadableDate(time);


    return (

      <div style = {{marginTop:'25px'}}>
          <div className="card">
              <h5 className="card-header">Story Detail</h5>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Author: {by}</p>
                <p className="card-text">Score: {score}</p>
                <p className="card-text">Karma: {karma}</p>
                <p className="card-text">Date Created: {formatted_date}</p>
              </div>
         </div>

         <h5 style = {{marginTop:'15px'}}> Comments </h5>

         <div className="list-group">

           {this.renderComments()}

        </div>


</div>
    );

}

  }


}




export default StoryShow;

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addStories} from '../actions/index';
import {Link} from 'react-router-dom';

class StoryIndex extends Component {


   componentDidMount(){

      this.props.addStories();

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

   renderTopStories(){



     const sortedArray = this.props.stories.sort((a,b)=>{

         return a.score<b.score?1:-1;

     });

      return sortedArray.map(({id, title, by, score, karma, time})=>{


          const formatted_date = this.renderHumanReadableDate(time);

            return (

              <Link key = {id}  className = "list-group-item list-group-item-action flex-column align-items-start"  to={ `/story/${id}` }>

                     <div className="d-flex w-100 justify-content-between">
                       <h5 className="mb-1">{title}</h5>
                   </div>
                  <p className="mb-1">Author: {by}</p>
                 <p className="mb-1">Score: {score}</p>
                 <p className="mb-1">Karma: {karma}</p>
                 <p className="mb-1">Date Created: {formatted_date}</p>
                 </Link>

            );



      });

   }


  render() {


  if(this.props.stories.length >0)
  {


    return (
      <div style = {{marginTop:'25px'}}>
        <ul className="list-group">

           {this.renderTopStories()}

          </ul>
      </div>
    );



  } else{

    return (
      <div>
        <h1>Data Loading...</h1>
      </div>
    );


  }

  }
}


function mapStateToProps(state){

 return {stories: state.stories};


}


export default connect(mapStateToProps, {addStories:addStories})(StoryIndex);

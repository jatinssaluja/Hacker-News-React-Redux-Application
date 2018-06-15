import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addStories} from '../actions/index';
import {Bar} from 'react-chartjs-2';

class Chart extends Component {


 constructor(props){

  super(props);

  this.chartData = {

        labels:[],
        datasets: [

         {
           label: 'Score',
           data:[],
           backgroundColor:'red'

         }
        ]
     }


 }

   componentDidMount(){

      this.props.addStories();

   }

   populateChartData(){

              if(this.chartData.labels.length===0){

                this.props.stories.forEach((story, index)=>{

                      this.chartData.labels.push(index);
                      this.chartData.datasets[0].data.push(story.score);

                });

              }

   }


  render() {


  if(this.props.stories.length >0)
  {


       this.populateChartData();

    return (
      <div>
       <Bar
          data={this.chartData}
          options={{

          legend:{position:'bottom'},

          layout:{

              padding:{left:0, right:0, bottom:0, top:200}


          }

          }}
         />
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


export default connect(mapStateToProps, {addStories})(Chart);

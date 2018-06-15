import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import StoryIndex from '../components/StoryIndex';
import StoryShow from '../components/StoryShow';
import Chart from '../components/Chart';
import Header from '../components/Header';


const AppRouter = ()=>(

    <BrowserRouter>
    <div>
     <Header/>
     <Switch>
      <Route exact={true} path="/" component={StoryIndex}/>
      <Route path="/story/:id" component={StoryShow}/>
      <Route path="/chart" component={Chart}/>
    </Switch>
    </div>
    </BrowserRouter>




	);


export default AppRouter;

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import DefaultRouter from '../../route';
import './App.css';

class Index extends Component {
  render() {
    return (
      <Router>
        <DefaultRouter/>
      </Router>
    );
  }
}

export default Index;
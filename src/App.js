import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import { useState } from 'react';
import FeedbackData from './data/FeedbackData.js';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => {
          return item.id !== id
      }));
    }
  }

  const addFeeback = (newFeedback) => {
      newFeedback.id = uuidv4();
      setFeedback([newFeedback, ...feedback]);
  }


  return (
    <>
      <Header />
      <div className='container'>
        <FeedbackForm handleAdd={addFeeback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList 
          feedback={feedback} 
          handleDelete={deleteFeedback} 
        />
      </div> 
    </>
  );
}

export default App;

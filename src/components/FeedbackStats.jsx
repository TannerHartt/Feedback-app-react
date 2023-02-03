import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {

    const { feedback } = useContext(FeedbackContext);



    let calculateAvgRatings = feedback.reduce((sum, curr) => {
        return sum + curr.rating;
    }, 0) / feedback.length;

    calculateAvgRatings = calculateAvgRatings.toFixed(1).replace(/[.,]0$/, ''); // Limit number to 1 decimal point and remove it if its a 0.


  return (
    <div className="feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: { isNaN(calculateAvgRatings) ? 0 : calculateAvgRatings }</h4>
    </div>
  );
}


export default FeedbackStats

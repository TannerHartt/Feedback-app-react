import Card from "./shared/Card";
import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const { addFeedback, feedbackEdit, updateFeedbackItem } = useContext(FeedbackContext);

    useEffect(() => {
        if (feedbackEdit.edit) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]);


    const handleTextChange = (event) => {
        if (text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Message must be at least 10 characters');
            setBtnDisabled(true);
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }
        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text, // text: text
                rating // rating: rating
            }

            if (feedbackEdit.edit === true) {
                updateFeedbackItem(feedbackEdit.item.id, newFeedback);
            } else {
                addFeedback(newFeedback);
            }
            setText('');
        }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleTextChange} value={text} type="text" placeholder="Write a review" />
                <Button type="submit" isDisabled={btnDisabled}>Submit</Button>
            </div>

            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm
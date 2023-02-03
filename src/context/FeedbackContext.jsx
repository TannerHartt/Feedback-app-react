import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState([
        {id: 1, text: 'This feedback item 1', rating: 10},
        {id: 2, text: 'This feedback item 2', rating: 3},
        {id: 3, text: 'This feedback item 3', rating: 6},
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    // Delete a feedback item.
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
        setFeedback(feedback.filter((item) => {
            return item.id !== id
        }));
        }
    }

    // Add a feedback item.
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({item, edit: true});
    }

    // Update a feedback item.
    const updateFeedbackItem = (id, updatedItem) => {
        setFeedback(feedback.map((item) => {
            return item.id === id ? {...item, ...updatedItem } : item
        }));
    }

    return (
        <FeedbackContext.Provider value={{
            feedback, // feddback: feedback
            deleteFeedback,
            addFeedback,
            editFeedback, // Click function that handles edit
            feedbackEdit, // State variable 
            updateFeedbackItem,
        }}>
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
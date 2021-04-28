import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from 'store/GlobalContext';

import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './Comments.module.css';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { showNotification } = useContext(GlobalContext);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then(({ comments }) => {
          setComments(comments);
          setIsLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: 'Adding your comment...',
      message: "It'll take a moment...",
      status: 'pending',
    });

    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(() =>
        showNotification({
          title: 'Success',
          message: 'Successfully added your comment!',
          status: 'success',
        })
      )
      .catch((error) =>
        showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        })
      );
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isLoading && <CommentList items={comments} />}
      {showComments && isLoading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;

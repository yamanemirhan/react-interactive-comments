import React, { useState } from 'react';

import { TextArea } from '../textarea';
import { Button } from '../button';

import styles from './styles.module.scss';

function NewComment({ isReply = false, image, alt, onClick }) {
  const [comment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleClick = () => {
    if (comment.length > 0) {
      onClick(comment);
    }
    setNewComment('');
  };

  return (
    <div className={styles.newComment}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={alt} />
      </div>
      <TextArea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
      />
      <Button variant="primary" onClick={handleClick}>
        {isReply ? 'Reply' : 'Send'}
      </Button>
    </div>
  );
}

export { NewComment };

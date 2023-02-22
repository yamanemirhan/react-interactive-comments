import React, { useState } from 'react';

import { useComment } from '../useComment';

import { TextArea } from '../../textarea';
import { Button } from '../../button';

import styles from './styles.module.scss';

function Content() {
  const {
    comment: { content, replyingTo },
    isEditing,
    onUpdate,
  } = useComment();

  const [comment, setComment] = useState(content);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleUpdate = (e) => {
    onUpdate(comment);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <TextArea value={comment} onChange={handleCommentChange} />
          <Button
            variant="primary"
            className={styles.updateButton}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </>
      ) : (
        <p className={styles.content}>
          {replyingTo && (
            <span className={styles.replyingTo}>@{replyingTo}&nbsp;</span>
          )}

          {content}
        </p>
      )}
    </div>
  );
}

export { Content };

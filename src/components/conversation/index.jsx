import React, { useState } from 'react';

import { Comment } from '../comment';
import { NewComment } from '../new-comment';

import { CommentContextProvider } from '../comment/useComment';

import Data from '../../../data.json';

import styles from './styles.module.scss';

function Conversation() {
  const [comments, setComments] = useState(Data.comments);

  const handleNewComment = (newComment) => {
    setComments([
      ...comments,
      {
        id: Math.floor(Math.random() * 100),
        content: newComment,
        createdAt: new Date().toLocaleDateString(),
        score: 0,
        user: Data.currentUser,
      },
    ]);
  };

  return (
    <div className={styles.conversationWrapper}>
      {comments.map((comment) => (
        <CommentContextProvider
          key={comment.id}
          data={{ comment, currentUser: Data.currentUser }}
        >
          <Comment />
        </CommentContextProvider>
      ))}
      <NewComment
        onClick={handleNewComment}
        image={Data.currentUser.image.png}
        alt={Data.currentUser.username}
      />
    </div>
  );
}

export { Conversation };

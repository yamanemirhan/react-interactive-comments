import React from 'react';

import { CommentContextProvider, useComment } from './useComment';

import { Reactions } from './reactions';
import { Header } from './header';
import { Content } from './content';
import { NewComment } from '../new-comment';

import styles from './styles.module.scss';

function Comment() {
  const { currentUser, comment, isReplying, onNewReply } = useComment();

  if (!comment) {
    return null;
  }

  return (
    <>
      <div className={styles.commentWrapper}>
        <Reactions />
        <div className={styles.commentInfos}>
          <Header />
          <Content />
        </div>
      </div>
      {comment?.replies?.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => (
            <CommentContextProvider
              key={reply.id}
              data={{ comment: reply, currentUser: currentUser }}
            >
              <Comment />
            </CommentContextProvider>
          ))}
        </div>
      )}
      {isReplying && (
        <NewComment
          onClick={onNewReply}
          isReply={true}
          image={currentUser.image.png}
          alt={currentUser.username}
        />
      )}
    </>
  );
}

export { Comment };

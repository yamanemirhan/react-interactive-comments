import React, { createContext, useContext, useState, useMemo } from 'react';

const CommentContext = createContext();

function CommentContextProvider({ children, data }) {
  const [comment, setComment] = useState(data.comment);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onReply = () => {
    setIsReplying(!isReplying);
  };

  const onEdit = () => {
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    setComment(null);
  };

  const onUpdate = (newCommentContent) => {
    setComment({
      ...comment,
      content: newCommentContent,
    });
    onEdit();
  };

  const onNewReply = (newCommentContent) => {
    setComment({
      ...comment,
      replies: [
        ...(comment.replies ?? []),
        {
          id: Math.floor(Math.random() * 100),
          content: newCommentContent,
          createdAt: new Date().toLocaleDateString(),
          score: 0,
          replyingTo: comment.user.username,
          user: data.currentUser,
        },
      ],
    });
    onReply();
  };

  const onPositiveReaction = () => {
    setComment({
      ...comment,
      score: comment.score + 1,
    });
  };
  const onNegativeReaction = () => {
    setComment({
      ...comment,
      score: comment.score - 1,
    });
  };

  const contextData = useMemo(
    () => ({
      currentUser: data.currentUser,
      comment,
      isReplying,
      isEditing,
      onReply,
      onDelete,
      onEdit,
      onUpdate,
      onNewReply,
      onPositiveReaction,
      onNegativeReaction,
    }),
    [comment, isReplying, isEditing]
  );

  return (
    <CommentContext.Provider value={contextData}>
      {children}
    </CommentContext.Provider>
  );
}

function useComment() {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error('There is no Comment Context Provider, first import it.');
  }

  return context;
}

export { useComment, CommentContextProvider };

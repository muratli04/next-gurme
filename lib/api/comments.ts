let comments = [];

export const addComment = (comment) => {
  comments.push({ ...comment, approved: false });
};

export const getApprovedComments = () => {
  return comments.filter(c => c.approved);
};

export const approveComment = (commentId) => {
  const comment = comments.find(c => c.id === commentId);
  if (comment) comment.approved = true;
};

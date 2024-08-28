import { useState } from 'react';
import { addComment, getApprovedComments } from '../lib/api/comments';

export default function CommentList() {
  const [comments, setComments] = useState(getApprovedComments());
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ text: newComment });
    setComments(getApprovedComments());
    setNewComment('');
  };

  return (
    <div>
      <h2>Yorumlar</h2>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.text}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Yorumunuzu yazın..." 
        />
        <button type="submit">Yorum Yap</button>
      </form>
    </div>
  );
}

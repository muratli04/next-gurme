
import { approveComment, getApprovedComments } from '../../../lib/api/comments';
import { useState } from 'react';

export default function ManageComments() {
  const [comments, setComments] = useState(getApprovedComments());

  const handleApprove = (id) => {
    approveComment(id);
    setComments(getApprovedComments());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Yorumları Yönet</h1>
        
        {comments.length === 0 ? (
          <p className="text-gray-600">Henüz yorum eklenmedi.</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border border-gray-300 p-4 rounded-lg mb-4 shadow-sm bg-gray-50">
              <p className="text-gray-700 mb-3">{comment.text}</p>
              <button 
                onClick={() => handleApprove(comment.id)} 
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-all"
              >
                Onayla
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

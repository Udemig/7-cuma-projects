import { useContext } from 'react';
import { IoIosSend } from 'react-icons/io';
import { UserContext } from './../../context/UserContext';
import { v4 } from 'uuid';
import axios from 'axios';

const CommentForm = ({ post }) => {
  const { activeUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // şifreyi kullanıcıdan kaldırma
    const author = { ...activeUser };
    delete author.password;

    // yeni yorum tanımalama
    const newComment = {
      author,
      text: e.target[0].value,
      date: new Date(),
      id: v4(),
    };

    // yeni yapılan yorumu dizinin başına ekle
    const tempComments = [...post.comments, newComment];

    axios.patch(`/posts/${post.id}`, { comments: tempComments });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 bg-gray-800 rounded-xl my-5 p-4"
    >
      <input
        className="w-full rounded p-2 text-black"
        placeholder="yorumunuzu giriniz..."
        type="text"
      />
      <button className="bg-blue-600   rounded p-2 flex items-center gap-1">
        <IoIosSend className="text-lg" />
      </button>
    </form>
  );
};

export default CommentForm;

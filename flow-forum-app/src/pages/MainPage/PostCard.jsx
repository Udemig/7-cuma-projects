import moment from 'moment/moment';
import { categories } from '../../constant';
import 'moment/locale/tr';
import { useNavigate } from 'react-router-dom';
const PostCard = ({ post }) => {
  // postun categorine karşılık gelen dizi elemanını bulma > renge erişim
  const category = categories.find((i) => i.title === post.category);

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/post/${post.id}`);
      }}
      className="bg-gray-800 p-5 sm:p-8 rounded-xl flex flex-col gap-5"
    >
      <h2 className="font-bold text-2xl">{post.title}</h2>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <img
            className="rounded-xl w-12 h-12 object-cover"
            src={post.author.image}
          />
          <div>
            <p>{post.author.name}</p>
            <p className="text-gray-400">
              {moment(post.date).fromNow()}
            </p>
          </div>
        </div>
        <div
          className="rounded-lg text-sm sm:text-base p-[5px] sm:p-[8px] text-center grid place-items-center"
          style={{ background: category.color }}
        >
          <span>{category.title}</span>
        </div>
      </div>

      <p>{post.content}</p>
    </div>
  );
};

export default PostCard;

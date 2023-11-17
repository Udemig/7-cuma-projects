import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '../MainPage/PostCard';
import Loading from '../../components/Loading';
import CommentForm from './CommentForm';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState();

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, []);

  return (
    <div>
      <button className="my-4" onClick={() => navigate(-1)}>
        {'<'} Geri
      </button>

      {!post ? <Loading /> : <PostCard post={post} />}

      <CommentForm post={post} />
    </div>
  );
};

export default DetailPage;

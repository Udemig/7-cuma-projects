import { useContext, useState } from 'react';
import { BiSolidDownArrowCircle } from 'react-icons/bi';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { categories } from './../../constant/index';
import { UserContext } from '../../context/UserContext';
import { v4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PostContext } from '../../context/PostContext';

const Form = () => {
  const { activeUser } = useContext(UserContext);
  const { addPost } = useContext(PostContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);

  // kaçıncı seviyedeki inputların ekrana basılcağını b
  const [inputLevel, setInputLevel] = useState(0);

  const handleSubmit = () => {
    // aktif kulalnıcın şifresi olamayan onjesini oluşturma
    const author = { ...activeUser };
    delete author.password;

    // yeni postu tanımlama
    const newPost = {
      id: v4(),
      author,
      title,
      content,
      category,
      date: new Date(),
      comments: [],
    };

    // yeni postu veritatbanına ekle
    axios
      .post('/posts', newPost)
      .then(() => {
        setTitle('');
        setInputLevel(0);
        addPost(newPost);
      })
      .catch((err) => {
        toast.error('Post gönderme başarısız');
      });
  };

  return (
    <div className="mt-5 flex flex-col gap-6">
      {/* 0.level */}
      <div className="grid grid-cols-5 items-center gap-4">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Başlık...."
          className="w-full rounded p-1 text-black shadow col-span-4"
        />

        <BiSolidDownArrowCircle
          onClick={() => {
            title && setInputLevel(1);
          }}
          className="text-2xl cursor-pointer hover:text-gray-400"
        />
      </div>

      {/* 1.level */}
      {inputLevel > 0 && (
        <div className="grid grid-cols-5 items-center gap-4">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Konu içeriği giriniz...."
            className="w-full rounded p-1 text-black shadow col-span-4 min-h-[200px] max-h-[400px]"
          />

          <div className="flex">
            <BiSolidDownArrowCircle
              onClick={() => {
                content && setInputLevel(2);
              }}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />

            <AiFillCloseCircle
              onClick={() => setInputLevel(0)}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>
      )}

      {/* 2.level */}
      {inputLevel > 1 && (
        <div className="grid grid-cols-5 items-center gap-4">
          <select
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="Başlık...."
            className="w-full rounded p-1 text-black shadow col-span-4"
          >
            {categories.map((cat) => (
              <option key={cat.title}>{cat.title}</option>
            ))}
          </select>

          <div className="flex">
            <AiFillCheckCircle
              onClick={handleSubmit}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
            <AiFillCloseCircle
              onClick={() => setInputLevel(1)}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;

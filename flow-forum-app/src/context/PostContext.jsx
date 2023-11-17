import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { arraysEqual } from '../utils/helpers';

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const getData = () => {
    axios.get('posts?_sort=date&_order=desc').then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    // ilk bileşen ekrana basıldığında verileri getir
    getData();

    // 5 saniyede bir yeni postlar için istek atar
    const interval = setInterval(() => {
      getData();
    }, 15000);

    // bileşenin ekranadqan ayrılmasını izle
    // ayrılırsa sayacı durdur
    return () => {
      clearInterval(interval);
    };
  }, []);

  const addPost = (newPost) => {
    // state'i dooğrudan değiştiremiyeceğimiz için kopysaını oluşturduk
    const clone = [...posts];
    // dizinin başımna yeni postu ekledik
    clone.unshift(newPost);
    // state'i güncelle
    setPosts(clone);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}

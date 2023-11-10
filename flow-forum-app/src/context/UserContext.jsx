import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:3000';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // oturumu açık olan kullanıcın bilgilerini tutarız
  const [activeUser, setActiveUser] = useState();

  const navigate = useNavigate();

  // kullanıcı projeye girdiğinde hesap bilgilerini al
  useEffect(() => {
    // öncelikle lokalden idye erişiriz
    const user_id = localStorage.getItem('token');
    // daha önce giriş yapan kullanıcı varsa hesap bilgileri için istek atarız
    if (user_id) {
      axios
        .get(`/users/${user_id}`)
        .then((res) => setActiveUser(res.data))
        .catch((err) => toast.error('Kullanıcı bilgileri alınamadı'));
    }
  }, []);

  // hesap oluşturma
  const signup = (user) => {
    axios
      .post('/users', user)
      .then(() => {
        // kullanıcının id'sini local storage'a ekle
        localStorage.setItem('token', user.id);
        // active user state'ini güncelle
        setActiveUser(user);
        // anasayfaya yölendir
        navigate('/');
        // bildirim ver
        toast.success('Hesabınız oluşturuldu');
      })
      .catch(() => {
        toast.error('Hesap oluşturulurken bir hata oluştu :(');
      });
  };

  // hesaba giriş yapma
  const login = (user) => {
    const params = {
      ...user,
      _limit: 1,
    };

    axios
      .get(`/users`, { params })
      .then((res) => {
        if (res.data.length === 0) {
          toast.error('Bilgilerinizle eşleşen kullanıcı bulunamadı');
        } else {
          setActiveUser(res.data[0]);
          localStorage.setItem('token', res.data[0].id);
          navigate('/');
          toast.success('Hesaba giriş yapılıyor...');
        }
      })
      .catch((err) => console.log(err));
  };

  // hesaptan çıkma
  const logout = () => {
    // lokal'den kaldır
    localStorage.removeItem('token');
    // active kullanıcyı sıfırla
    setActiveUser(null);
    // login'e yönlendir
    navigate('/login');
  };

  // hesabı sil
  const deleteAccount = () => {
    axios
      .delete(`/users/${activeUser.id}`)
      .then(() => {
        logout(); // oturumu kapat
        toast.info('Hesabını başarıyla kaldırıldı');
      })
      .catch(() => toast.error('Hesap silme başarısız'));
  };

  return (
    <UserContext.Provider
      value={{ activeUser, signup, login, logout, deleteAccount }}
    >
      {children}
    </UserContext.Provider>
  );
};

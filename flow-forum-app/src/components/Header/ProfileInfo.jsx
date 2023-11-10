import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const ProfileInfo = () => {
  const { activeUser, logout } = useContext(UserContext);

  return (
    <div>
      {!activeUser ? (
        <div className="w-28 h-12 bg-gray-600 rounded-lg animate-pulse" />
      ) : (
        <div className="group relative flex items-center gap-4 cursor-pointer p-2 rounded-md transition hover:bg-gray-700">
          <img
            className="w-10 h-10 rounded-full"
            src={activeUser.image}
            alt="user-pic"
          />
          <h2 className="font-bold">{activeUser.name}</h2>

          {/* hover olunca açılır */}
          <div className="group-hover:block hidden absolute top-14 bg-gray-600 rounded start-[-30px] p-1">
            <p className="rounded p-2">{activeUser.email}</p>
            <Link
              to={'/profile'}
              className="rounded p-2 hover:bg-gray-400"
            >
              Profili Göster
            </Link>
            <p
              onClick={logout}
              className="rounded p-2 hover:bg-gray-400"
            >
              Çıkış Yap
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;

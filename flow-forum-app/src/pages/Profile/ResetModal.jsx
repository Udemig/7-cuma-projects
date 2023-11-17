import axios from 'axios';
import { toast } from 'react-toastify';

const ResetModal = ({ id, close }) => {
  //
  const handleSubmit = (e) => {
    e.preventDefault();

    // yeni şifreye erişme
    const newPass = e.target[0].value;

    // veritabanındaki kullanıcın şifreisni güncelle
    axios
      .patch(`/users/${id}`, { password: newPass })
      .then(() => {
        toast.success('Şifreniz başarıyla güncellendi');
        close();
      })
      .catch((err) => {
        toast.error('Üzgünüz işlem başarısız :(');
      });
  };

  return (
    <main className="bg-black bg-opacity-50 fixed  top-0 left-0 w-full h-screen grid place-items-center p-6 z-50">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="py-7 px-14 sm:py-12  sm:px-18">
          <div className="flex justify-end mb-6">
            <span
              onClick={close}
              className="text-white cursor-pointer"
            >
              X
            </span>
          </div>
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Şifrenizi mi unuttunuz?
            </h1>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    for="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Yeni Şifre
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Şifreyı Sıfırla
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetModal;

import { GeneralContainer } from '@/components/general-container';
import Negative from '../../../../public/assets/terjangkit.svg';
import Positif from '../../../../public/assets/help.png';
import useRiwayat from '@/view-model/riwayat-view-model';
import { useEffect, useState } from 'react';
import moment from 'moment';

interface Penyakit {
  namaPenyakit: string;
}
interface Riwayat {
  id: string;
  createdDate: string
  penyakit?: Penyakit;
}

const History: React.FC = () => {
  const { callbackedRiwayat } = useRiwayat();
  const [riwayats, setRiwayats] = useState<Riwayat[]>([]);

  useEffect(() => {
    const getRiwayat = async () => {
      const response = await callbackedRiwayat();
      setRiwayats(response);
    };

    getRiwayat();
  }, [callbackedRiwayat]);

  return (
    <GeneralContainer>
      <p className="text-xl font-bold p-8 w-full text-center fixed bg-white text-black">
        Riwayat Pemeriksaan
      </p>
      <div className="h-screen overflow-scroll w-screen flex flex-col bg-white justify-start items-center gap-6 mt-20">
        {riwayats.length > 0 ? (
          riwayats.map((riwayat) => (
            <div
              key={riwayat.id}
              className="flex p-6 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5 mb-5"
            >
              <div>
                <p
                  className={`${
                    riwayat.penyakit ? 'text-red-500' : 'text-black'
                  } font-bold text-2xl`}
                >
                  {riwayat.penyakit ? riwayat.penyakit.namaPenyakit : 'Tidak terdeteksi'}
                </p>
                <p className='text-black'>
                 {moment(riwayat.createdDate).format('llll')}
                </p>
              </div>
              <img src={riwayat.penyakit ? Negative : Positif} width={40} height={40} />
            </div>
          ))
        ) : (
          <p className="font-bold text-black">Belum ada riwayat terkait</p>
        )}
      </div>
    </GeneralContainer>
  );
};

export default History;

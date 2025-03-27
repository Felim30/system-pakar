import { GeneralContainer } from '@/components/general-container';
import Negative from '../../../../public/assets/terjangkit.svg'
import Positif from '../../../../public/assets/positive.svg'

const History: React.FC = () => {

  return (
      <GeneralContainer>
        <p className='text-xl font-bold p-8 w-full text-center fixed bg-white'>Riwayat Pemeriksaan</p>
        <div className='h-screen overflow-scroll w-screen flex flex-col bg-white justify-start items-center gap-6 mt-24'>
          <div 
            className='flex p-6 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5'
          >
            <p className={`text-red-500 font-bold text-2xl`}>Positif</p>
            <img src={Negative} width={40} height={40} />
          </div>
          <div 
            className='flex p-6 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5'
          >
            <p className={`text-[#0EB96F] font-bold text-2xl`}>Negatif</p>
            <img src={Positif} width={40} height={40} />
          </div>
        </div> 
      </GeneralContainer>
  );
};

export default History
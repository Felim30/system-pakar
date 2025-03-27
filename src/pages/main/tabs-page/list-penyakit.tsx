import { GeneralContainer } from '@/components/general-container';
import Negative from '../../../../public/assets/terjangkit.svg'
import { useHistory } from 'react-router';
import { TitleBar } from '@/components/bar/title-bar';

const ListPenyakit: React.FC = () => {

  const history = useHistory();
  
    const handlePencegahan = () => {
      history.push('/main/pencegahan')
    }

  return (
      <GeneralContainer>
       <TitleBar title='Penyakit' />
        <div className='h-screen overflow-scroll w-screen flex flex-col bg-white justify-start items-center gap-6 mt-24'>
          <div 
            className='flex p-6 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5'
            onClick={handlePencegahan}
          >
            <p className={`font-bold text-2xl`}>Scabies</p>
            <img src={Negative} width={40} height={40} />
          </div>
          <div 
            className='flex p-6 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5'
            onClick={handlePencegahan}
          >
            <p className={`font-bold text-2xl`}>Tinea</p>
            <img src={Negative} width={40} height={40} />
          </div>
          <div 
            className='flex p-6 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5'
            onClick={handlePencegahan}
          >
            <p className={`font-bold text-2xl`}>Liken simpleks kronikus</p>
            <img src={Negative} width={40} height={40} />
          </div>
          <div 
            className='flex p-6 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5'
            onClick={handlePencegahan}
          >
            <p className={`font-bold text-2xl`}>Dermatitis</p>
            <img src={Negative} width={40} height={40} />
          </div>
        </div> 
      </GeneralContainer>
  );
};

export default ListPenyakit
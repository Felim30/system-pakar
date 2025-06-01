import { GeneralContainer } from '@/components/general-container';
import Logo from '../../../../public/assets/4941442.png'
import  Pencegahan from '../../../../public/assets/pencegahan.png'
import  CekKondisi from '../../../../public/assets/18174.png'
import { useHistory } from 'react-router';


const Dashboard: React.FC = () => {

  const history = useHistory();

  const handleListPenyakit = () => {
    history.push('/main/listpenyakit')
  }

  const handleCekKondisi = () => {
    history.push('/main/cek-kondisi')
  }


  return (
      <GeneralContainer>
        <div className='h-screen w-screen flex flex-col bg-white justify-center items-center gap-6'>
            <div className='shadow-xl w-4/5 flex flex-col rounded-xl border border-transparent p-4'>
                <img src={Logo} width={200} height={200} className='self-end'/>
                <p className='text-xl font-bold text-black'>Sistem pakar penyakit Scabies</p>
            </div>
            <p className='text-[#0EB96F] text-2xl text-left font-bold w-4/5'>Lainnya</p>
            <div 
                className='flex p-4 rounded-xl justify-between shadow-xl border border-transparent items-center w-4/5'
                onClick={handleCekKondisi}
              >
                <p className='text-xl font-bold text-black'>Cek kondisimu</p>
                <img src={CekKondisi} width={50} height={50} />
            </div>
            <div 
                className='flex p-4 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5'
                onClick={handleListPenyakit}
            >
                <p className='text-xl font-bold text-black'>Cek Pencegahan</p>
                <img src={Pencegahan} width={50} height={50} />
            </div>
        </div> 
      </GeneralContainer>
  );
};

export default Dashboard;

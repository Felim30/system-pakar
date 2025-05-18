import { GeneralContainer } from '@/components/general-container';
import { useHistory } from 'react-router';
import { TitleBar } from '@/components/bar/title-bar';
import { useEffect, useState } from 'react';
import usePenyakit from '@/view-model/penyakit-view-model';
import { MAIN_URL } from '@/lib/constant';

interface Penyakit{
  id: string,
  namaPenyakit: string,
  penyakitProfile: string
}

const ListPenyakit: React.FC = () => {

  const { getAllPenyakit } = usePenyakit();
  const [penyakitList , setPenyakitList] = useState<Penyakit[]>([]);

  useEffect(() => {

    const getAllPenyakitList = async () => {
      const response = await getAllPenyakit();
      console.log(response)
      setPenyakitList(response)
    }

    getAllPenyakitList();
    
  }, [getAllPenyakit])

  const history = useHistory();
  
    const handlePencegahan = (id : string) => {
      history.push(`/main/pencegahan/${id}`)
    }

  return (
      <GeneralContainer>
       <TitleBar title='Penyakit' />
        <div className='h-screen overflow-scroll w-screen flex flex-col bg-white justify-start items-center gap-6 mt-24'>
          {penyakitList.map((penyakit) => {
            return (
            <div 
              key={penyakit.id}
              className='flex p-6 justify-between rounded-xl shadow-xl border border-transparent items-center w-4/5'
              onClick={() => handlePencegahan(penyakit.id)}
            >
              <p className={`font-bold text-black text-2xl`}>{penyakit.namaPenyakit}</p>
              <img src={`${MAIN_URL}${penyakit.penyakitProfile}`} width={40} height={40} />
          </div>
          )
          })}
          
          
        </div> 
      </GeneralContainer>
  );
};

export default ListPenyakit
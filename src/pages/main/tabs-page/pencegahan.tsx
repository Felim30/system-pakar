import { TitleBar } from '@/components/bar/title-bar';
import { GeneralContainer } from '@/components/general-container';
import { useParams } from 'react-router';
import usePenyakit from '@/view-model/penyakit-view-model';
import { useEffect, useState } from 'react';
import { MAIN_URL } from '@/lib/constant';
import Loading from '@/components/Loading';

interface Pencegahan {
  id: string
  namaPencegahan: string;
}

interface Penyakit {
  namaPenyakit: string,
  deskripsi: string,
  penyakitProfile: string,
  pencegahan : Pencegahan[]
}

interface Gejala {
  id: string
  namaGejala : string
}
const Pencegahan: React.FC = () => {

  const  { id } = useParams<{id : string}>();

  const { getPenyakitById } = usePenyakit();
  

  const [penyakit , setPenyakit] = useState<Penyakit>({
    namaPenyakit: "",
    deskripsi: "",
    pencegahan: [],
    penyakitProfile: ""
  });
  const [gejala , setGejala] = useState<Gejala[]>([]);

  useEffect(() => {
    const getPenyakitByIdCall = async () => {
      const response = await getPenyakitById(id);
      setPenyakit(response.penyakit)
      setGejala(response.gejala)
    }

    getPenyakitByIdCall();
  }, [id, getPenyakitById])

  return (
      <GeneralContainer> =
        <TitleBar title={penyakit.namaPenyakit} redirectTo='/main/listpenyakit'/>
        <div className='flex flex-col bg-white justify-center h-full items-center gap-y-6 mt-4'>
            {penyakit.penyakitProfile == "" ? 
            (
             <Loading />
            )
             : (
                <>
                  <img 
                    src={`${MAIN_URL}${penyakit.penyakitProfile}`} 
                    width={150}
                    height={150}
                  />
                  <div className='w-3/4 h-2/5 overflow-y-scroll font-light text-black'>
                    {penyakit.deskripsi}
                    <p>Gejala penyakit ini yaitu : </p>
                    <br/>
                    <ul className="list-disc list-inside">
                      {gejala.map((gej) => {
                        return <li key={gej.id}>{gej.namaGejala}</li>
                      })}
                    </ul>
                     <br/>
                    <p>Langkah pencegahan yang bisa diambil yaitu : </p>
                    <br/>
                    <ul className="list-disc list-inside">
                      {penyakit.pencegahan.map((pencegahan) => {
                        return <li key={pencegahan.id}>{pencegahan.namaPencegahan}</li>
                      })}
                    </ul>
                  </div>
                </>                
              )
          }
        </div>
      </GeneralContainer>
  );
};

export default Pencegahan

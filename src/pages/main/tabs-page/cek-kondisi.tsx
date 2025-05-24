import { GeneralContainer } from '@/components/general-container';
import { useState, useEffect } from 'react';
import RadioInput from '@/components/input/radio-input';
import { Button } from '@/components/button/Button';
import { TitleBar } from '@/components/bar/title-bar';
import { useHistory } from 'react-router-dom';
import useGejala from '@/view-model/gejala-view-model';
import useRiwayat from '@/view-model/riwayat-view-model';
import { IonLabel, IonSpinner } from '@ionic/react';

interface Gejala {
  id: string,
  namaGejala: string,

}

const CekKondisi: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [selectedGeJala, setSelectedGejala] = useState<string[]>([]);
  const [gejala , setGejala] = useState<Gejala[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [disabled , setDisabled] = useState<boolean>(false);
  const [isLoading , setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  const { callbackedGetGejala } = useGejala()
  const { konsultasi } = useRiwayat()

  useEffect(() => {
    setIsLoading(true);
    const getGejala = async () => {
      const response = await callbackedGetGejala();
      console.log(response);
      setGejala(response);
      setIsLoading(false);
    };

    getGejala();
  }, [callbackedGetGejala]);

  useEffect(() => {
    if (!gejala[index]) return;

    const currentId = gejala[index].id;
    setSelected((prev) => {
      if (currentId in prev) return prev;
      return { ...prev, [currentId]: false }; 
    });

  }, [index, gejala, selected ,selectedGeJala]);


  const handleIncrement = () => {
    if (index < gejala.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleGejalaChange = (value: Gejala, isYes: boolean) => {
    setSelected((prev) => ({ ...prev, [value.id]: isYes }));
    setSelectedGejala((prev) => {
      if (isYes) {
        return prev.includes(value.id) ? prev : [...prev, value.id]; 
      }
      return prev.filter((item) => item !== value.id); 
    });
  };

  const checkAndRedirect = async () => {
    setDisabled(true);
    console.log(selectedGeJala);
    const response = await konsultasi(selectedGeJala);
    const penyakit = response.penyakit
    const diagnosa : string = penyakit == null ? "sehat" : penyakit.namaPenyakit;
    if(diagnosa){
      history.push(`/main/hasil/${diagnosa}`);
      setDisabled(false);
      setSelectedGejala([]);
    }
  };
  
  return (
    <GeneralContainer>
      <TitleBar title="Cek Kondisi" />
      <div className="h-screen overflow-scroll w-screen flex flex-col bg-white justify-center items-center gap-6">
        {isLoading ? (
           <>
            <IonLabel style={{ color: '#0EB96F' }}>Loading</IonLabel>
            <IonSpinner name="dots" style={{ color: '#0EB96F' }} />
          </>
        ) :
          (<>
            <p className="font-semibold text-black">Silahkan jawab pertanyaan berikut</p>
            {gejala[index] &&<div className="bg-[#0EB96F] p-4 flex flex-col gap-4 rounded-lg border-2 border-white drop-shadow-lg w-4/5">
              <p className="text-xl text-white">
                Apakah anda mengalami {gejala[index].namaGejala}?
              </p>
              <RadioInput
                label="Yes"
                variant="foreground"
                name="data"
                checked={selected[gejala[index].id] === true}
                onChange={() => handleGejalaChange(gejala[index], true)}
              />
              <RadioInput
                label="No"
                name="data"
                variant="foreground"
                checked={selected[gejala[index].id] === false}
                onChange={() => handleGejalaChange(gejala[index], false)}
              />
            </div>}
            <div className="flex gap-5 w-4/5 justify-between">
              <Button 
                text="Kembali" 
                variant="foreground" 
                onClick={handleDecrement}
              />
              
              {index !== gejala.length - 1 ? <Button text="Lanjut" variant="primary" onClick={handleIncrement} /> 
              : <Button 
                  text={disabled ? "Submitting..." : "Submit"} 
                  variant='primary' 
                  onClick={checkAndRedirect} 
                  disable={disabled}
                />
              }
            </div>
          </>)}
      </div>
    </GeneralContainer>
  );
};

export default CekKondisi;

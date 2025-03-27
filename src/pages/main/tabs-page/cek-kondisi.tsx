import { GeneralContainer } from '@/components/general-container';
import { cekKondisi, dataGejala } from '../../../../data';
import { useState, useEffect } from 'react';
import RadioInput from '@/components/input/radio-input';
import { Button } from '@/components/button/Button';
import { TitleBar } from '@/components/bar/title-bar';
import { useHistory } from 'react-router';

const CekKondisi: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [gejala, setGejala] = useState<number[]>([]);
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const history = useHistory();

  useEffect(() => {
    const currentId = dataGejala[index].id;
    if (!(currentId in selected)) {
      setSelected((prev) => ({ ...prev, [currentId]: true }));
      setGejala((prev) => (prev.includes(currentId) ? prev : [...prev, currentId]));
    }

    console.log(selected)
  }, [index, selected, gejala]);

  const handleIncrement = () => {
    if (index < dataGejala.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleGejalaChange = (value: number, isYes: boolean) => {
    setSelected((prev) => ({ ...prev, [value]: isYes }));
    setGejala((prev) => {
      if (isYes) {
        return prev.includes(value) ? prev : [...prev, value]; 
      }
      return prev.filter((item) => item !== value); 
    });
  };

  const checkAndRedirect = async () => {

    const diagnosa = await cekKondisi(gejala);
    history.push(`/main/hasil/${diagnosa}`);
  };
  
  return (
    <GeneralContainer>
      <TitleBar title="Cek Kondisi" />
      <div className="h-screen overflow-scroll w-screen flex flex-col bg-white justify-center items-center gap-6">
        <p className="font-semibold">Silahkan jawab pertanyaan berikut</p>
        <div className="bg-[#0EB96F] p-4 flex flex-col gap-4 rounded-lg border-2 border-white drop-shadow-lg w-4/5">
          <p className="text-xl text-white">
            Apakah anda mengalami {dataGejala[index].name}?
          </p>
          <RadioInput
            label="Yes"
            variant="foreground"
            name="data"
            checked={selected[dataGejala[index].id] === true}
            onChange={() => handleGejalaChange(dataGejala[index].id, true)}
          />
          <RadioInput
            label="No"
            name="data"
            variant="foreground"
            checked={selected[dataGejala[index].id] === false}
            onChange={() => handleGejalaChange(dataGejala[index].id, false)}
          />
        </div>
        <div className="flex gap-5 w-4/5 justify-between">
          <Button text="Kembali" variant="foreground" onClick={handleDecrement} />
          
          {index !== dataGejala.length - 1 ? <Button text="Lanjut" variant="primary" onClick={handleIncrement} /> 
          : <Button text="Submit" variant='primary' onClick={checkAndRedirect}/>}
        </div>
      </div>
    </GeneralContainer>
  );
};

export default CekKondisi;

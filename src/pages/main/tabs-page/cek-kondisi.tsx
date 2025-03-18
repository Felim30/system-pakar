import { GeneralContainer } from '@/components/general-container';
import { dataGejala } from '../../../../data'
import { useState } from 'react';
import RadioInput from '@/components/input/radio-input';
import { Button } from '@/components/button/Button';
import { TitleBar } from '@/components/bar/title-bar';

const CekKondisi: React.FC = () => {

  const [index , setIndex] = useState<number>(0);
  const [gejala, setGejala] = useState<number[]>([]);

  
  const hanldeIncrement = () => {
    if(index < dataGejala.length -1){
        setIndex(prev => prev +1)
    }
  } 

  const hanldeDecrement = () => {
    if(index > 0){
        setIndex(prev => prev -1)
    }
  } 


  return (
      <GeneralContainer>
        <TitleBar title='Cek Kondisi' />
        <div className='h-screen overflow-scroll w-screen flex flex-col bg-foreground justify-center items-center gap-6'>
            <p className='font-semibold'>Silahkan jawab pertanyaan berikut</p>
            <div className='bg-primary p-4 flex flex-col gap-4 rounded-lg border-2 border-white drop-shadow-lg w-4/5'>
                <p className='text-xl text-foreground'> 
                    Apakah anda mengalami {dataGejala[index].name} ?
                </p>
                <RadioInput 
                    label='Yes'
                    variant='foreground'
                    defaultChecked
                    name='data'
                />
                <RadioInput 
                    label='No'
                    name='data'
                    variant='foreground'
                />
            </div>
            <div className='flex gap-5 w-4/5'>
                <Button text="Kembali" variant='foreground'onClick={hanldeDecrement}/>
                <Button text="Lanjut" variant='primary' onClick={hanldeIncrement}/>
            </div>
        </div> 
      </GeneralContainer>
  );
};

export default CekKondisi
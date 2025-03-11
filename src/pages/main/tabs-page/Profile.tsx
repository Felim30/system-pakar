import { GeneralContainer } from '@/components/general-container';
import ProfileImg from '../../../../public/assets/profile.png'
import { Button } from '@/components/button/Button';
import RadioInput from '@/components/input/radio-input';

const Profile: React.FC = () => {


  return (
      <GeneralContainer>
        <div className='h-screen overflow-scroll w-screen flex flex-col bg-foreground justify-center items-center gap-4'>
            <img className='rounded-full' src={ProfileImg} width={180} height={180}/>
              <input 
                type='text' 
                placeholder='Username' 
                className='py-4 !text-primary !text-xl w-2/3 focus:outline-none border border-b-primary border-transparent'
              />
            <div className="flex items-center justify-between w-2/3">
                <input 
                  type='number' 
                  placeholder='Tinggi' 
                  className='py-4 !text-primary !text-xl w-4/5 focus:outline-none border border-b-primary border-transparent'
                />
                <p className='text-primary text-xl'>cm</p>
            </div>
            <div className="flex items-center justify-between w-2/3">
                <input 
                  type='number' 
                  placeholder='Berat' 
                  className='py-4 !text-primary !text-xl w-4/5 focus:outline-none border border-b-primary border-transparent'
                />
                <p className='text-primary text-xl'>kg</p>
            </div>
            <div className="flex items-center justify-between w-2/3">
              <RadioInput 
                id="pria"
                value="pria"
                name='gender'
                label='Pria'
                defaultChecked
              />
              <RadioInput 
                type='radio' 
                name='gender'
                id="wanita"
                value="wanita"
                label='Wanita'
              />
            </div>
            <div className='flex justify-between w-2/3 gap-4'>
              <Button text='Back' variant='foreground' />
              <Button text='Edit' variant='primary'/>
            </div>
        </div>
      </GeneralContainer>
  );
};

export default Profile;

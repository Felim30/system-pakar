import { Logo } from '@/components/logo/logo'
import { GeneralContainer } from '@/components/general-container';
import { Input } from '@/components/input/input';
import { useState } from 'react';
import { Button } from '@/components/button/Button';
import { useHistory } from 'react-router';

const ForgetPassword: React.FC = () => {

  const [text , setText] = useState<string>("");

  const nav = useHistory()

  const handleToLogin = () => {
    console.log(text)
    nav.push('/home')
  }

  return (
      <GeneralContainer>
        <div className='h-screen w-screen flex flex-col bg-[#0EB96F] justify-center items-center gap-4'>
         <Logo /> 
         <p className='text-white font-medium text-2xl'>Lupa password</p>
         <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            placeholder='Username'
          />
          <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            placeholder='Password'
            isPassword={true}
          />
          <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            placeholder='Confirm Password'
            isPassword={true}
          />
          <div className='flex gap-4 w-3/5 justify-between h-auto'>
              <Button 
                text='Login'
                variant='foreground'
                onClick={handleToLogin}
              />
              <Button 
                text='Submit'
                variant='primary'
                onClick={() => setText("")}
              />
          </div>
        </div>
      </GeneralContainer>
  );
};

export default ForgetPassword;

import { Logo } from '@/components/logo/logo'
import { GeneralContainer } from '@/components/general-container';
import { Input } from '@/components/input/input';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@/components/button/Button';

const Home: React.FC = () => {

  const [loading , setLoading] = useState<boolean>(false)
  const [text , setText] = useState<string>("")
  const history = useHistory()

  const handleToLogin = () => {
    history.push('/daftar')
  }
  
  const handleMainMenu = () => {
    setLoading (true)

    setTimeout(() => {
      console.log(text)
      history.push('/main');
      setLoading (false);
    }, 3000)
    
  }

  return (
      <GeneralContainer>
        <div className='h-screen w-screen flex flex-col bg-primary justify-center items-center gap-4'>
         <Logo /> 
         <p className='text-foreground font-medium text-4xl'>Login</p>
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
          <Link to='/forget-password' className='underline !text-foreground'>
              Lupa password
          </Link>
          <div className='flex gap-4 w-3/5 justify-between h-auto'>
              <Button 
                text='Daftar'
                variant='foreground'
                onClick={handleToLogin}
              />
              <Button 
                text={loading ? '' : 'Login'}
                variant='primary'
                disable={loading}
                onClick={handleMainMenu}
              />
          </div>
        </div>
      </GeneralContainer>
  );
};

export default Home;

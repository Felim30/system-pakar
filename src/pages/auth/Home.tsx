import { Logo } from '@/components/logo/logo'
import { GeneralContainer } from '@/components/general-container';
import { Input } from '@/components/input/input';
import {  useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@/components/button/Button';
import useAuth from '@/view-model/auth-view-model';
import { useIonToast } from '@ionic/react';

const Home: React.FC = () => {

  const [loading , setLoading] = useState<boolean>(false);
  const [username , setUsername] = useState<string>("");
  const [password , setPassword] = useState<string>("");
  const [present] = useIonToast();

  const presentToast = (text : string , color: string) => {
      present({
        message: text,
        duration: 1500,
        color: color,
        position: "top",
      });
  };

  const { handleLogin } = useAuth();

  const history = useHistory()

  const handleToLogin = async (name: string , password: string) => {
    try {
      setLoading(true);
      const token = await handleLogin(name , password);
      if(token){
        
        presentToast("Login success", "success");
        setTimeout(() => {
          history.push("/main");
        }, 1000) 
       
      }
    } catch (error) {
      presentToast("Login failed please check credentials", 'danger');
      console.error(error);
    }finally{
      setLoading(false);
    }
    
  }

  
  const handleToRegister = () => {
   history.push("/daftar") 
  }

  return (
      <GeneralContainer>
        <div className='h-screen w-screen mb-8 flex flex-col bg-[#0EB96F] justify-center items-center gap-4'>
         <Logo /> 
         <p className='text-white font-medium text-4xl'>Login</p>
         <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            placeholder='Username'
            value={username}
          />
          <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder='Password'
            value={password}
            isPassword={true}
          />
          <Link to='/forget-password' className='underline !text-white'>
              Lupa password
          </Link>
          <div className='flex gap-4 w-3/5 justify-between h-auto'>
              <Button 
                text='Daftar'
                variant='foreground'
                onClick={handleToRegister}
              />
              <Button 
                text={loading ? 'Login...' : 'Login'}
                variant='primary'
                disable={loading}
                onClick={() => handleToLogin(username , password)}
              />
          </div>
        </div>
      </GeneralContainer>
  );
};

export default Home;

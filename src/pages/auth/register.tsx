import { Logo } from '@/components/logo/logo'
import { GeneralContainer } from '@/components/general-container';
import { Input } from '@/components/input/input';
import {  useState } from 'react';
import { Button } from '@/components/button/Button';
import { useHistory } from 'react-router';
import useAuth from '@/view-model/auth-view-model';
import { useIonToast } from '@ionic/react';

const Register: React.FC = () => {

  const [username , setUsername] = useState<string>("")
  const [password , setPassword] = useState<string>("")
  const [confirmPassword , setConfirmPassword] = useState<string>("")

  const [loading , setLoading] = useState<boolean>(false);

  const history = useHistory();

  const { handleRegister } = useAuth();

  const [present] = useIonToast();

  const presentToast = (text : string , color: string) => {
      present({
        message: text,
        duration: 1500,
        color: color,
        position: "bottom",
      });
  };

  const handleToLogin = () => {
    setLoading(false)
    history.push('/home')
  }

  const handleToRegister = async (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    setLoading(true);
    try {
      await handleRegister(username, password, confirmPassword);
      presentToast("User is created", 'success');
      
      setTimeout(() => {
          history.push("/home");
      },1000)
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        presentToast(err.message, 'danger');
        console.error(err);
      } else {
        presentToast("Terjadi kesalahan tidak terduga", 'danger');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <GeneralContainer>
        <div className='h-screen w-screen flex flex-col bg-[#0EB96F] justify-center items-center gap-4'>
         <Logo /> 
         <p className='text-white font-medium text-4xl'>Daftar</p>
         <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            value={username}
            placeholder='Username'
          />
          <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder='Password'
            value={password}
            isPassword={true}
          />
          <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            value={confirmPassword}
            isPassword={true}
          />
          <div className='flex gap-4 w-3/5 justify-between h-auto'>
              <Button 
                text='Login'
                variant='foreground'
                onClick={handleToLogin}
              />
              <Button 
                text={loading ? 'Submitting...' :  'Submit'}
                variant='primary'
                onClick={() => handleToRegister(username , password , confirmPassword)}
                disable={loading}
              />
          </div>
        </div>
      </GeneralContainer>
  );
};

export default Register;

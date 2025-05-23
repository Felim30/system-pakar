import { Logo } from '@/components/logo/logo'
import { GeneralContainer } from '@/components/general-container';
import { Input } from '@/components/input/input';
import { useState } from 'react';
import { Button } from '@/components/button/Button';
import { useHistory } from 'react-router';
import useAuth from '@/view-model/auth-view-model';
import { useIonToast } from '@ionic/react';

const ForgetPassword: React.FC = () => {

  const [username , setUsername] = useState<string>("");
  const [password , setPassword] = useState<string>("");
  const [confirmPassword , setConfirmPassword] = useState<string>("");
  const [loading , setLoading] = useState<boolean>(false);

  const nav = useHistory()

  const handleToLogin = () => {
    nav.push('/home')
  }

  const { handleForgetPassword } = useAuth();

  const [present] = useIonToast();
  
    const presentToast = (text : string , color: string) => {
        present({
          message: text,
          duration: 1500,
          color: color,
          position: "top",
        });
    };

  const handleSubmit = async (username : string , password: string, confirmPassword: string) => {
    setLoading(true)
    try {
      await handleForgetPassword(username, password, confirmPassword);

      presentToast("Password is changed", "success")

       setTimeout(() => {
          nav.push("/home");
      },1000)

    } catch (error) {

      if (error instanceof Error) {

        presentToast(error.message, 'danger');
        console.error(error);

      } else {

        presentToast("Terjadi kesalahan tidak terduga", 'danger');
        console.error(error);

      }
    }finally{
      setLoading(false)
    }
  }


  return (
      <GeneralContainer>
        <div className='h-screen w-screen flex flex-col bg-[#0EB96F] justify-center items-center gap-4'>
         <Logo /> 
         <p className='text-white font-medium text-2xl'>Lupa password</p>
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
            isPassword={true}
            value={password}
          />
          <Input 
            type='text' 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            isPassword={true}
            value={confirmPassword}
          />
          <div className='flex gap-4 w-3/5 justify-between h-auto'>
              <Button 
                text='Login'
                variant='foreground'
                onClick={handleToLogin}
              />
              <Button 
                disable={loading}
                text={loading ? 'Submitting...' : 'Submit'}
                onClick={() => handleSubmit(username, password, confirmPassword)}
                variant='primary'
              />
          </div>
        </div>
      </GeneralContainer>
  );
};

export default ForgetPassword;

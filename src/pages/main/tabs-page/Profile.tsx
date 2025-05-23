import { GeneralContainer } from '@/components/general-container';
import ProfileImg from '../../../../public/assets/profile.png'
import { Button } from '@/components/button/Button';
import RadioInput from '@/components/input/radio-input';
import React, { useEffect, useRef, useState } from 'react';
import useUser from '@/view-model/user-view-model';
import { useHistory } from 'react-router';
import { MAIN_URL } from '@/lib/constant';
import { useIonToast } from '@ionic/react';

interface User {
  username : string,
  tinggi : number,
  berat: number,
  jenisKelamin: string 
}

const PencilIcon: React.FC<{ className?: string , onClick : () => void }> = ({ className , onClick }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
      strokeWidth={1.5}
      stroke="currentColor"
      className={className || 'w-4 h-4'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.313l-4.5 1.125 1.125-4.5L16.862 3.487z"
      />
    </svg>
  );


const Profile: React.FC = () => {

  const ref = useRef<HTMLInputElement | null>(null);

  const [user , setUser] = useState<User>({
    username: "",
    tinggi: 0,
    berat: 0,
    jenisKelamin: "Laki_laki"
  })

  const handleProfileClick = () => {
    ref.current?.click();  
  };

  const history = useHistory();

  const [profile , setProfile] = useState<string>("")
  const [loading , setLoading] = useState<boolean>(false);
  const [submitedProfile, setSubmitedProfile] = useState<File | null>(null);
  const { getUser , updateUser } = useUser();

   const [present] = useIonToast();
  
    const presentToast = (text : string , color: string) => {
        present({
          message: text,
          duration: 1500,
          color: color,
          position: "bottom",
        });
    };

  
  const updateUserProfile = async () => {

    try{
      setLoading(true)
      const response  = await updateUser(user , submitedProfile);

      if(response){
        presentToast("User is updated", 'success');
        setUser({
            username: response.username || "",
            tinggi: response.tinggi || 0,
            berat: response.berat || 0,
            jenisKelamin: response.jenisKelamin || "Laki-laki"
          });
      }
    }catch(e){
      presentToast("Failed update user", 'danger');
    }finally{
      setLoading(false)
    }
  }

  

  useEffect(() => {

    const getProfiles = async () => {
      const userapi = await getUser();

    
      if(userapi){
        setUser({
          username: userapi.username || "",
          tinggi: userapi.tinggi || 0,
          berat: userapi.berat || 0,
          jenisKelamin: userapi.jenisKelamin || "Laki-laki"
        });
      }

      if(userapi.profile !== null){
        setProfile(`${MAIN_URL}${userapi.profile}`)
      }
      
    }  
  
    getProfiles();
  }, [getUser])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSubmitedProfile(file)
      setProfile(imageUrl);
    }
  };

  const handleBack = () => {
    history.push("/main/dashboard")
  }
  

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: name === 'tinggi' || name === 'berat' ? parseInt(value) : value
    }));
  };
  

  return (
      <GeneralContainer>
        <div className='h-screen overflow-scroll w-screen flex flex-col bg-white justify-center items-center gap-4'>
          <div className='relative'>
           <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
              <img
                className="object-cover w-full h-full"
                src={profile ? profile : ProfileImg}
                alt="Profile"
              />
            </div>
            <PencilIcon 
                className='absolute w-[4rem] p-4 h-[4rem] bottom-2 left-[7.5rem] rounded-full h-2rem bg-gray-500 text-white' 
                onClick={handleProfileClick}
              />
          </div>
       
          <input 
            type='file' 
            ref={ref}
            name='file'
            onChange={handleProfileChange}
            className='hidden'
          />
          <input 
            type='text' 
            value={user.username}
            name='username'
            readOnly
            placeholder='Username' 
            onChange={handleUserChange}
            className='py-4 !text-[#0EB96F] !text-xl w-2/3 focus:outline-none border border-b-[#0EB96F] border-transparent'
          />
          <div className="flex items-center justify-between w-2/3">
            <input 
              type='number' 
              placeholder='Tinggi' 
              name="tinggi"
              onChange={handleUserChange}
              value={user.tinggi}
              className='py-4 !text-[#0EB96F] !text-xl w-4/5 focus:outline-none border border-b-[#0EB96F] border-transparent'
            />
            <p className='text-[#0EB96F] text-xl'>cm</p>
          </div>
          <div className="flex items-center justify-between w-2/3">
            <input 
              type='number' 
              value={user.berat}
              onChange={handleUserChange}
              name="berat"
              placeholder='Berat' 
              className='py-4 !text-[#0EB96F] !text-xl w-4/5 focus:outline-none border border-b-[#0EB96F] border-transparent'
            />
            <p className='text-[#0EB96F] text-xl'>kg</p>
          </div>
          <div className="flex items-center justify-between w-2/3">
              <RadioInput 
                id="Laki_laki"
                value="Laki_laki"
                name="jenisKelamin"
                label="Laki-laki"
                checked={user.jenisKelamin === "Laki_laki"} 
                onChange={handleUserChange}
              />
              <RadioInput 
                id="Perempuan"
                value="Perempuan"
                name="jenisKelamin"
                label="Perempuan"
                checked={user.jenisKelamin === "Perempuan"} 
                onChange={handleUserChange}
              />
            </div>
            <div className='flex justify-between w-2/3 gap-4'>
              <Button 
                text='Back'
                variant='foreground' 
                onClick={handleBack}
              />
              <Button 
                text={loading? 'Editing...' : 'Edit'}
                variant='primary' 
                onClick={updateUserProfile}
              />
            </div>
        </div>
      </GeneralContainer>
  );
};

export default Profile;

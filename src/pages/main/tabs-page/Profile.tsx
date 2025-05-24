import { GeneralContainer } from '@/components/general-container';
import ProfileImg from '../../../../public/assets/profile.png';
import { Button } from '@/components/button/Button';
import RadioInput from '@/components/input/radio-input';
import React, { useEffect, useRef, useState } from 'react';
import useUser from '@/view-model/user-view-model';
import { useHistory } from 'react-router';
import { MAIN_URL } from '@/lib/constant';
import { IonInput, useIonToast } from '@ionic/react';
import Loading from '@/components/Loading';
interface User {
  username: string;
  tinggi: number;
  berat: number;
  jenisKelamin: string;
}

const PencilIcon: React.FC<{ className?: string; onClick: () => void }> = ({
  className,
  onClick,
}) => (
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
  const [user, setUser] = useState<User>({
    username: '',
    tinggi: 0,
    berat: 0,
    jenisKelamin: 'Laki_laki',
  });

  const history = useHistory();
  const [profile, setProfile] = useState<string>('');
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitedProfile, setSubmitedProfile] = useState<File | null>(null);
  const { getUser, updateUser } = useUser();

  const [present] = useIonToast();

  const presentToast = (text: string, color: string) => {
    present({
      message: text,
      duration: 1500,
      color: color,
      position: 'top',
    });
  };

  const updateUserProfile = async () => {
    try {
      setLoading(true);
      const response = await updateUser(user, submitedProfile);
      if (response) {
        presentToast('User is updated', 'success');
        setUser({
          username: response.username || '',
          tinggi: response.tinggi || 0,
          berat: response.berat || 0,
          jenisKelamin: response.jenisKelamin || 'Laki_laki',
        });
      }
    } catch (e) {
      presentToast('Failed update user', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getProfiles = async () => {
      const userapi = await getUser();
      if (userapi) {
        setUser({
          username: userapi.username || '',
          tinggi: userapi.tinggi || 0,
          berat: userapi.berat || 0,
          jenisKelamin: userapi.jenisKelamin || 'Laki_laki',
        });
        setIsLoadingUser(false)
      }

      if (userapi.profile !== null) {
        setProfile(`${MAIN_URL}${userapi.profile}`);
      }
    };

    getProfiles();
  }, [getUser]);

  const handleProfileClick = () => {
    ref.current?.click();
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSubmitedProfile(file);
      setProfile(imageUrl);
    }
  };

  const handleBack = () => {
    history.push('/main/dashboard');
  };

  const handleUserChange = (name: keyof User, value: string | number) => {
    setUser((prev) => ({
      ...prev,
      [name]: name === 'tinggi' || name === 'berat' ? parseInt(value as string) || 0 : value,
    }));
  };

  return (
    <GeneralContainer>
      <div className="h-screen overflow-scroll w-screen flex flex-col bg-white justify-center items-center gap-4">
        {isLoadingUser ?
        (
         <Loading />
        )
         : (
          <>
            <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
              <img
                className="object-cover w-full h-full"
                src={profile ? profile : ProfileImg}
                alt="Profile"
              />
            </div>
            <PencilIcon
              className="absolute w-[4rem] p-4 h-[4rem]  bottom-1 left-[6.0rem] rounded-full bg-gray-500 text-white"
              onClick={handleProfileClick}
            />
          </div>

          <input
            type="file"
            ref={ref}
            name="file"
            onChange={handleProfileChange}
            className="hidden"
          />

          <IonInput
            label="Username"
            labelPlacement="floating"
            readonly
            value={user.username}  
            className="input-green !w-2/3 border-b-1 border-gray-400"
          />

          <div className="flex items-center justify-between w-2/3">
            <IonInput
              label="Tinggi"
              labelPlacement="floating"
              type="number"
              value={user.tinggi}
              className="input-green border-b-1 border-gray-400"
              onIonInput={(e) => handleUserChange('tinggi', e.detail.value as string)}
            />
            <p className="text-[#0EB96F] text-md">cm</p>
          </div>

          <div className="flex items-center justify-between w-2/3">
            <IonInput
              label="Berat"
              labelPlacement="floating"
              type="number"
              value={user.berat}
              className="input-green border-b-1 border-gray-400"
              onIonInput={(e) => handleUserChange('berat', e.detail.value as string)}
            />
            <p className="text-[#0EB96F] text-md">kg</p>
          </div>

          <div className="flex items-center justify-between w-2/3">
            <RadioInput
              id="Laki_laki"
              value="Laki_laki"
              name="jenisKelamin"
              label="Laki-laki"
              checked={user.jenisKelamin === 'Laki_laki'}
              onChange={(e) => handleUserChange('jenisKelamin', e.target.value)}
            />
            <RadioInput
              id="Perempuan"
              value="Perempuan"
              name="jenisKelamin"
              label="Perempuan"
              checked={user.jenisKelamin === 'Perempuan'}
              onChange={(e) => handleUserChange('jenisKelamin', e.target.value)}
            />
          </div>

          <div className="flex justify-between w-2/3 gap-4">
            <Button text="Back" variant="foreground" onClick={handleBack} />
            <Button
              text={loading ? 'Editing...' : 'Edit'}
              variant="primary"
              onClick={updateUserProfile}
            />
          </div>
        </>
      ) } 
      </div>
    </GeneralContainer>
  );
};

export default Profile;

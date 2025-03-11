import { TitleBar } from '@/components/bar/title-bar';
import { GeneralContainer } from '@/components/general-container';
import ScabiesImg from '../../../../public/assets/scabies.png'

const Pencegahan: React.FC = () => {

  return (
      <GeneralContainer>
        <TitleBar title='Scabies'/>
        <div className='flex flex-col justify-center h-full items-center gap-y-6 mt-4'>
            <img 
                src={ScabiesImg} 
                width={150}
                height={150}
            />
            <div className='w-3/4 h-2/5 overflow-y-scroll font-semibold'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
      </GeneralContainer>
  );
};

export default Pencegahan
import { useAppSelector } from '@/app/hooks';
import AccountDetails from './features/register/components/AccountDetails';
import PersonalInfo from './features/register/components/PersonalInfo';
import { selectStep, StepMap } from '@/features/register/slice';
import Registered from '@/features/register/components/Registered';

function App() {
  const step = useAppSelector(selectStep);

  return (
    <>
      {step === 1 && <AccountDetails title={StepMap[1]} />}
      {step === 2 && <PersonalInfo title={StepMap[2]} />}
      {step === 3 && <Registered title={StepMap[3]} />}
    </>
  );
}

export default App;

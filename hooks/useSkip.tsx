import {Screens} from '@/models/nav';
import {useNav} from './useNav';
import {useCommonStore} from '@/stores/commonStore';

const useSkip = () => {
  const nav = useNav();

  const setIsStartSkipped = useCommonStore(state => state.setIsStartSkipped);

  const skip = () => {
    setIsStartSkipped(true);
    nav.navigate(Screens.Mood_Select);
  };

  return skip;
};

export default useSkip;

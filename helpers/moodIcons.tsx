import {Moods} from '@/models/common';

import QuiteIcon from '@/assets/icons/mood/quite.svg';
import MysticalIcon from '@/assets/icons/mood/mystical.svg';
import StarryIcon from '@/assets/icons/mood/starry.svg';

export const MOOD_ICONS = {
  [Moods.Quite]: <QuiteIcon />,
  [Moods.Mystical]: <MysticalIcon />,
  [Moods.Starry]: <StarryIcon />,
};

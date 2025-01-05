import {NavProp} from '@/models/nav';
import {useNavigation} from '@react-navigation/native';

export const useNav = () => useNavigation<NavProp>();

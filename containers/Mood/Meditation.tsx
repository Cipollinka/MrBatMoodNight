import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '@/components/Container';
import {useCommonStore} from '@/stores/commonStore';
import {MOOD_LABELS} from '@/helpers/labels';
import Text from '@/components/common/Text';
import PlayIcon from '../../assets/icons/play.svg';
import Button from '@/components/common/Button';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import {Moods} from '@/models/common';
import Sound from 'react-native-sound';

const musicPaths = {
  Mystical: '333221__hdfreema__night-crickets-back-porch.aiff',
  Quite: '412941__i_luv_soundz__lake-at-night-2.aiff',
  Starry: '687212__traviow__frogs-at-night-lots-of-them.aiff',
};

const bgToMood = {
  [Moods.Mystical]: 'meditation_mystical',
  [Moods.Quite]: 'meditation_quite',
  [Moods.Starry]: 'meditation_starry',
};

export default function MoodMeditation() {
  const nav = useNav();
  const currentMood = useCommonStore(state => state.currentMood);
  const label = MOOD_LABELS?.[currentMood] || 'Mystical night';

  const [sound, setSound] = useState<Sound | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const musicFile = musicPaths[currentMood];

  useEffect(() => {
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (sound) {
          sound.getCurrentTime(seconds => setCurrentTime(seconds));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, sound]);

  const togglePlayback = () => {
    if (!sound) {
      const newSound = new Sound(musicFile, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.error('Failed to load sound', error);
          return;
        }
        setSound(newSound);
        newSound.play(() => {
          setIsPlaying(false);
          setCurrentTime(0);
          newSound.setCurrentTime(0);
        });
      });
      setSound(newSound);
    } else {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play(() => {
          setIsPlaying(false);
          setCurrentTime(0);
          sound.setCurrentTime(0);
        });
      }
    }
    setIsPlaying(prev => !prev);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Container ok bg={bgToMood[currentMood]}>
      <View style={styles.container}>
        <View style={{marginTop: 90}} />
        <Text fs={24} fw="semibold">
          {label} Meditation
        </Text>
        <Text fs={54} fw="semibold">
          {formatTime(currentTime)}
        </Text>

        <TouchableOpacity onPress={togglePlayback} style={{marginTop: '35%'}}>
          <View style={styles.action}>
            {isPlaying && (
              <View style={styles.pauseContainer}>
                <View style={styles.pauseItem} />
                <View style={styles.pauseItem} />
              </View>
            )}
            {!isPlaying && <PlayIcon />}
          </View>
        </TouchableOpacity>

        <View style={{marginTop: 48}} />
        <Button
          title="Skip this step"
          onPress={() => {
            if (sound) {
              sound.stop(() => sound.release());
            }
            nav.navigate(Screens.Mood_Timeline, {step: 2});
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  action: {
    width: 71,
    height: 71,
    borderRadius: 9999,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseContainer: {
    flexDirection: 'row',
    gap: 7,
  },
  pauseItem: {
    width: 5,
    height: 20,
    backgroundColor: '#57A9FF',
    borderRadius: 9999,
  },
});

import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
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
  Mystical: 'mystical.mp3',
  Quite: 'quite.mp3',
  Starry: 'starry.mp3',
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
    Sound.setCategory('Playback');
    const newSound = new Sound(musicFile, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.error('Error loading sound:', error);
        return;
      }
    });
    setSound(newSound);

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && sound) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => setCurrentTime(seconds));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, sound]);

  const togglePlayback = () => {
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
    } else {
      sound.play(success => {
        if (!success) {
          console.error('Playback failed');
        }
      });
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
        <Text fs={24} fw="semibold" style={styles.meditationTitle}>
          {label} Meditation
        </Text>
        <View style={styles.timerContainer}>
          <Text fs={30} fw="medium">
            {formatTime(currentTime)}
          </Text>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {width: `${(currentTime / 180) * 100}%`},
              ]}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.playButton}
          onPress={togglePlayback}
          activeOpacity={0.7}>
          <PlayIcon width={24} height={24} />
        </TouchableOpacity>

        <View>
          <Button
            title="Finish Meditation"
            onPress={() => {
              sound?.pause();
              nav.navigate(Screens.Mood_NightStory);
            }}
          />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  meditationTitle: {
    marginBottom: 40,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    width: 200,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});

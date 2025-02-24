import {
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useMemo, useState} from 'react';

import {stories} from '@/helpers/stories';
import Text from '@/components/common/Text';
import {useCommonStore} from '@/stores/commonStore';
import {MOOD_LABELS} from '@/helpers/labels';
import Container from '@/components/Container';
import Title from '@/components/common/Title';

import ShareIcon from '@/assets/icons/share.svg';
import BookmarkIcon from '@/assets/icons/bookmarkB.svg';
import Button from '@/components/common/Button';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import Block from '@/components/common/Block';

export default function MoodStory() {
  const nav = useNav();
  const currentMood = useCommonStore(state => state.currentMood);
  const moodStories = useCommonStore(state => state.moodStories);
  const updateMoodStory = useCommonStore(state => state.updateMoodStory);
  const updateFavoriteStory = useCommonStore(
    state => state.updateFavoriteStory,
  );
  const label = MOOD_LABELS[currentMood] || '';
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const currentStory = useMemo(
    () => stories[currentMood][moodStories[currentMood] % 5],
    [moodStories, currentMood],
  );
  const handleNextPress = () => {
    updateMoodStory(currentMood);
    nav.navigate(Screens.Mood_Track);
  };
  const handleShare = () => {
    Share.share({
      title: currentStory.title,
      message: currentStory.description,
    });
  };
  const handleBookmark = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    updateFavoriteStory(currentMood, moodStories[currentMood]);
  };
  return (
    <Container>
      <Block style={styles.mainContainer}>
        <Title style={styles.title}>{label}: story</Title>
        <View style={styles.contentContainer}>
          <Text fw="bold" fs={24} style={styles.storyTitle}>
            {currentStory.title}
          </Text>
          <Text fs={18} style={styles.description}>
            {currentStory.description}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handleShare} activeOpacity={0.8}>
            <View style={styles.action}>
              <ShareIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmark} activeOpacity={0.8}>
            <Animated.View
              style={[styles.action, {transform: [{scale: scaleAnim}]}]}>
              <BookmarkIcon />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <Button
          title="Next"
          variant="secondary"
          onPress={handleNextPress}
          style={styles.nextButton}
        />
      </Block>
    </Container>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    marginBottom: 32,
    fontSize: 32,
    textAlign: 'center',
  },
  contentContainer: {
    gap: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    paddingBottom: 0,
    borderRadius: 20,
  },
  storyTitle: {
    textAlign: 'center',
    color: '#fff',
  },
  description: {
    textAlign: 'center',
    color: '#E8E8E8',
    lineHeight: 28,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 32,
    marginBottom: 40,
  },
  action: {
    width: 71,
    height: 71,
    borderRadius: 9999,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButton: {
    marginTop: 'auto',
  },
});

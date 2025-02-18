import {Share, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';

import {stories} from '@/helpers/stories';
import Text from '@/components/common/Text';
import {useCommonStore} from '@/stores/commonStore';
import {MOOD_LABELS} from '@/helpers/labels';
import Container from '@/components/Container';
import Bottom from '@/components/common/Bottom';
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

  const currentStory = useMemo(
    () => stories[currentMood][moodStories[currentMood] % 5],
    [moodStories, currentMood, stories],
  );

  const handleNextPress = () => {
    updateMoodStory(currentMood);

    nav.navigate(Screens.Mood_Track);
  };

  return (
    <Container>
      <Block>
        <Title>{label}: story</Title>

        <View
          style={{
            gap: 20,
            marginHorizontal: 16,
            alignItems: 'center',
          }}>
          <Text fw="bold" fs={22}>
            {currentStory.title}
          </Text>
          <Text fs={17} style={{textAlign: 'center'}}>
            {currentStory.description}
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() =>
              Share.share({
                title: currentStory.title,
                message: currentStory.description,
              })
            }>
            <View style={styles.action}>
              <ShareIcon />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              updateFavoriteStory(currentMood, moodStories[currentMood])
            }>
            <View style={styles.action}>
              <BookmarkIcon />
            </View>
          </TouchableOpacity>
        </View>

        <Button title="Next" variant="secondary" onPress={handleNextPress} />
      </Block>
    </Container>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    gap: 18,
    marginTop: 18,
    marginBottom: 40,
  },
  action: {
    width: 71,
    height: 71,
    borderRadius: 9999,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

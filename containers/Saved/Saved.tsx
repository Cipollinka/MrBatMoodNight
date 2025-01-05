import {ScrollView, Share, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import Container from '@/components/Container';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import BottomBar from '@/components/BottomBar';
import {useCommonStore} from '@/stores/commonStore';
import {stories} from '@/helpers/stories';
import Text from '@/components/common/Text';
import {Moods} from '@/models/common';

import ShareIcon from '@/assets/icons/share.svg';
import BookmarkIcon from '@/assets/icons/bookmark.svg';

interface StoryItemProps {
  story: any;
  onSavePress: () => void;
}

const StoryItem = ({story, onSavePress}: StoryItemProps) => {
  return (
    <View
      style={{
        gap: 20,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 12,
        backgroundColor: '#345B83',
        marginTop: 10,
      }}>
      <Text fw="bold" fs={22}>
        {story.title}
      </Text>
      <Text fs={17}>{story.description}</Text>

      <View style={{flexDirection: 'row', gap: 16}}>
        <TouchableOpacity
          onPress={() =>
            Share.share({title: story.title, message: story.description})
          }>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ShareIcon width={26} height={26} color="#57A9FF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSavePress}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BookmarkIcon width={26} height={26} color="#57A9FF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Saved() {
  const favoriteStories = useCommonStore(state => state.favoriteStories);
  const updateFavoriteStory = useCommonStore(
    state => state.updateFavoriteStory,
  );
  console.log('favoriteStories', favoriteStories);

  const counter = Object.values(favoriteStories).reduce(
    (acc, value) => acc + value.length,
    0,
  );
  const storiesList = useMemo(
    () =>
      Object.entries(stories).reduce((acc, [key, value]) => {
        const savedIndexes = favoriteStories[key];

        if (savedIndexes?.length) {
          savedIndexes.forEach(index => {
            const item = value[index % 5];
            item.mood = key;
            acc.push(item);
          });
        }

        return acc;
      }, []),
    [favoriteStories, counter, stories],
  );

  const isStoriesEmpty = storiesList.length === 0;

  const handleSavePress = (mood: Moods, index: number) => {
    updateFavoriteStory(mood, index);
  };

  return (
    <Container>
      <Bottom>
        <Title>Saved stories</Title>

        {!isStoriesEmpty && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 220}}>
            {storiesList.map((story, index) => (
              <StoryItem
                key={index}
                story={story}
                onSavePress={() => handleSavePress(story.mood, index)}
              />
            ))}
          </ScrollView>
        )}

        {isStoriesEmpty && (
          <View style={{marginBottom: 300, marginTop: 12}}>
            <Text fs={17}>No saved stories yet</Text>
          </View>
        )}
      </Bottom>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          zIndex: 2,
          transform: [{translateX: `-50%`}],
        }}>
        <BottomBar />
      </View>
    </Container>
  );
}

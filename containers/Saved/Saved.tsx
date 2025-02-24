import {
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Story {
  title: string;
  description: string;
  mood?: Moods;
}

interface StoryItemProps {
  story: Story;
  onSavePress: () => void;
}

const StoryItem: React.FC<StoryItemProps> = ({story, onSavePress}) => {
  const handleShare = () => {
    Share.share({title: story.title, message: story.description});
  };

  return (
    <View style={styles.storyItem}>
      <Text fw="bold" fs={22}>
        {story.title}
      </Text>
      <Text fs={17}>{story.description}</Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={handleShare}>
          <View style={styles.actionButton}>
            <ShareIcon width={26} height={26} color="#57A9FF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSavePress}>
          <View style={styles.actionButton}>
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

  const isEmpty = useMemo(
    () => Object.values(favoriteStories).length > 0,
    [favoriteStories],
  );

  const storiesList = useMemo(
    () =>
      Object.entries(stories).reduce<Story[]>((acc, [key, value]) => {
        const savedIndexes = favoriteStories[key];

        if (savedIndexes?.length) {
          savedIndexes.forEach(index => {
            const item = value[index % 5];
            acc.push({...item, mood: key as Moods});
          });
        }

        return acc;
      }, []),
    [favoriteStories],
  );
  // AsyncStorage.clear();
  return (
    <Container>
      <Bottom>
        <Title>Saved Stories</Title>

        {isEmpty && (
          <Text style={{marginVertical: 20}}>There are no saved stories</Text>
        )}

        {!isEmpty && (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}>
            {storiesList.map((story, index) => (
              <StoryItem
                key={`${story.title}-${index}`}
                story={story}
                onSavePress={() =>
                  story.mood &&
                  updateFavoriteStory(
                    story.mood,
                    favoriteStories[story.mood][index],
                  )
                }
              />
            ))}
          </ScrollView>
        )}
        <BottomBar />
      </Bottom>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  storyItem: {
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: '#345B83',
    marginTop: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

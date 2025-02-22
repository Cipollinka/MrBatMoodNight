import {Share, StyleSheet, View} from 'react-native';
import React from 'react';
import Container from '@/components/Container';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import {useCommonStore} from '@/stores/commonStore';
import {Tracker} from '@/models/common';
import Text from '@/components/common/Text';
import {TRACKER_LABELS} from '@/helpers/labels';
import Button from '@/components/common/Button';
import BottomBar from '@/components/BottomBar';

interface ChartData {
  color: string;
  mood: Tracker;
}

const chartData: ChartData[] = [
  {color: '#7EBD57', mood: Tracker.Nice},
  {color: '#FFD21D', mood: Tracker.Normal},
  {color: '#E85050', mood: Tracker.Terrible},
];

const totalChartWidth = 284;

export default function Profile() {
  const moodTracker = useCommonStore(state => state.moodTracker);

  const totalDays = Object.values(moodTracker).reduce(
    (acc, value) => acc + value,
    0,
  );

  const entries = Object.entries(moodTracker);

  const handleShare = () => {
    const text = entries
      .map(([key, value]) => {
        const percent = Math.round((value / totalDays) * 100);
        return `${percent}% - ${TRACKER_LABELS[key]}`;
      })
      .join('\n');

    Share.share({
      title: 'Mood tracker statistic',
      message: `My mood tracker statistic:\n\n${text}`,
    });
  };

  return (
    <Container>
      <Bottom>
        <Title>My Profile</Title>
        <Text fw="medium" fs={18} style={styles.subtitle}>
          Mood tracker statistic
        </Text>
        <View style={styles.chartContainer}>
          {chartData.map(data => {
            const width = totalChartWidth * (moodTracker[data.mood] / totalDays);
            return (
              <View
                key={data.mood}
                style={[styles.chartItem, {width, backgroundColor: data.color}]}
              />
            );
          })}
        </View>

        <View style={styles.statisticsContainer}>
          {entries.map(([key, value]) => {
            const percent = Math.round((value / totalDays) * 100);
            return (
              <Text key={key} fw="medium" fs={18}>
                {percent}% - {TRACKER_LABELS[key]}
              </Text>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Share" variant="secondary" onPress={handleShare} />
        </View>

        <BottomBar />
      </Bottom>
    </Container>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 'auto',
    marginTop: 8,
  },
  chartItem: {
    height: 72,
    borderRadius: 8,
  },
  statisticsContainer: {
    gap: 12,
    marginTop: 4,
    width: '80%',
    marginBottom: 12,
  },
  buttonContainer: {
    marginBottom: 50,
  },
});

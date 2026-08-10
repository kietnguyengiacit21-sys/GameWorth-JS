import React, {useEffect} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoadingState from '../../components/LoadingState';
import {fetchGameDetail} from '../../features/games/gamesSlice';
import {colors} from '../../theme/colors';

function GameDetailScreen({navigation, route}) {
  const {gameId} = route.params;
  const dispatch = useDispatch();

  const {items, selectedGame, detailLoading, error} =
    useSelector(state => state.games);

  const cachedGame = items.find(game => game.id === gameId);
  const game =
    selectedGame?.id === gameId
      ? selectedGame
      : cachedGame ?? null;

  useEffect(() => {
    dispatch(fetchGameDetail(gameId));
  }, [dispatch, gameId]);

  if (detailLoading && !game) {
    return <LoadingState message="Loading game detail..." />;
  }

  if (!game) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.errorTitle}>
          Cannot open this game
        </Text>
        <Text style={styles.errorText}>
          {error || 'Game data was not found.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.screen}>
      {game.coverImageUrl ? (
        <Image
          source={{uri: game.coverImageUrl}}
          style={styles.cover}
        />
      ) : (
        <View style={[styles.cover, styles.coverFallback]}>
          <Text style={styles.coverLetter}>
            {game.title.charAt(0)}
          </Text>
        </View>
      )}

      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.metadata}>
        {game.genre || 'Unknown genre'}
        {game.platform ? ` • ${game.platform}` : ''}
      </Text>
      <Text style={styles.price}>
        {Number(game.price) === 0
          ? 'Free'
          : `$${Number(game.price).toFixed(2)}`}
      </Text>

      <Text style={styles.sectionTitle}>Overview</Text>
      <Text style={styles.description}>
        {game.description || 'No description available.'}
      </Text>

      <View style={styles.buttonGrid}>
        <Pressable
          onPress={() =>
            navigation.navigate('GameMedia', {gameId})
          }
          style={styles.linkButton}>
          <Text style={styles.linkText}>Game Media</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate('SystemRequirements', {gameId})
          }
          style={styles.linkButton}>
          <Text style={styles.linkText}>Requirements</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate('CommunityRating', {gameId})
          }
          style={styles.linkButton}>
          <Text style={styles.linkText}>Community Rating</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate('ReviewList', {gameId})
          }
          style={styles.linkButton}>
          <Text style={styles.linkText}>Reviews</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  cover: {
    width: '100%',
    height: 210,
    borderRadius: 18,
  },
  coverFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
  },
  coverLetter: {
    color: colors.primary,
    fontSize: 64,
    fontWeight: '900',
  },
  title: {
    marginTop: 20,
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  metadata: {
    marginTop: 6,
    color: colors.textMuted,
  },
  price: {
    marginTop: 12,
    color: colors.primary,
    fontSize: 21,
    fontWeight: '900',
  },
  sectionTitle: {
    marginTop: 28,
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    marginTop: 10,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  buttonGrid: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  linkButton: {
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 11,
    backgroundColor: colors.surfaceHigh,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '800',
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  errorTitle: {
    color: colors.error,
    fontSize: 20,
    fontWeight: '800',
  },
  errorText: {
    marginTop: 8,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

export default GameDetailScreen;

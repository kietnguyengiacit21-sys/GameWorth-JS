import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import EmptyState from '../../components/EmptyState';
import GameCard from '../../components/GameCard';
import LoadingState from '../../components/LoadingState';
import {fetchGames} from '../../features/games/gamesSlice';
import {colors} from '../../theme/colors';

function GameListScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {items, listLoading, error} = useSelector(
    state => state.games,
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchGames());
    }
  }, [dispatch, items.length]);

  const reload = useCallback(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  if (listLoading && items.length === 0) {
    return <LoadingState message="Loading games from Redux..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Games</Text>
          <Text style={styles.subtitle}>
            {items.length} games loaded through Redux
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => navigation.navigate('SearchGame')}
            style={styles.actionButton}>
            <Text style={styles.actionText}>Search</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('FilterGame')}
            style={styles.actionButton}>
            <Text style={styles.actionText}>Filter</Text>
          </Pressable>
        </View>
      </View>

      {error && items.length === 0 ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Cannot load games</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={reload} style={styles.retryButton}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={listLoading}
              onRefresh={reload}
              colors={[colors.primary]}
              tintColor={colors.primary}
              progressBackgroundColor={colors.surfaceHigh}
            />
          }
          renderItem={({item}) => (
            <GameCard
              game={item}
              onPress={() =>
                navigation.navigate('GameDetail', {
                  gameId: item.id,
                })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="No games"
              message="The backend returned an empty game list."
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 3,
    color: colors.textMuted,
    fontSize: 12,
  },
  actions: {
    marginTop: 13,
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: colors.surfaceHigh,
  },
  actionText: {
    color: colors.primary,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
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
  retryButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  retryText: {
    color: colors.onPrimary,
    fontWeight: '800',
  },
});

export default GameListScreen;

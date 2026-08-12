import React from 'react';

import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';

import EmptyState from '../../components/EmptyState';
import GameCard from '../../components/GameCard';
import LoadingState from '../../components/LoadingState';

import { fetchGames } from '../../features/games/gamesSlice';

import { colors } from '../../theme/colors';


function GameListScreen(props) {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const gamesState = useSelector(
    function (state) {
      return state.games;
    }
  );
  const items = gamesState.items;
  const listLoading = gamesState.listLoading;
  const error = gamesState.error;
  function loadGames() {
    dispatch(
      fetchGames()
    );
  }
  React.useEffect(
    function () {
      if (items.length === 0) {
        loadGames();
      }
    },
    [items.length]
  );
  function reloadGames() {

    loadGames();
  }
  function openSearchScreen() {

    navigation.navigate(
      'SearchGame'
    );
  }
  function openFilterScreen() {
    navigation.navigate(
      'FilterGame'
    );
  }
  function openGameDetail(gameId) {
    navigation.navigate(
      'GameDetail',
      {
        gameId: gameId
      }
    );
  }
  function getGameKey(item) {
    const gameId = item.id;
    const key = gameId.toString();
    return key;
  }

  function renderGame(info) {
    const item = info.item;
    function handleGamePress() {
      const gameId = item.id;
      openGameDetail(gameId);
    }

    return (
      <GameCard
        game={item}
        onPress={handleGamePress}
      />
    );
  }

  const emptyComponent = (
    <EmptyState
      title="No games"
      message="The backend returned an empty game list."
    />
  );

  const refreshComponent = (
    <RefreshControl
      refreshing={listLoading}
      onRefresh={reloadGames}
      colors={[colors.primary]}
      tintColor={colors.primary}
      progressBackgroundColor={colors.surfaceHigh}
    />
  );

  if (listLoading && items.length === 0) {
    return (
      <LoadingState
        message="Loading games..."
      />
    );
  }
  if (error && items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            Cannot load games
          </Text>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <Pressable
            onPress={reloadGames}
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>
              Try again
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Games
        </Text>
        <Text style={styles.subtitle}>
          {items.length} games loaded through Redux
        </Text>
        <View style={styles.actions}>
          <Pressable
            onPress={openSearchScreen}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>
              Search
            </Text>
          </Pressable>
          <Pressable
            onPress={openFilterScreen}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>
              Filter
            </Text>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={items}
        keyExtractor={getGameKey}
        renderItem={renderGame}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshComponent}
        ListEmptyComponent={emptyComponent}
      />
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
import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingState from '../../components/LoadingState';
import { fetchGameDetail } from '../../features/games/gamesSlice';
import { colors } from '../../theme/colors';

function GameDetailScreen(props) {
  const navigation = props.navigation;
  const route = props.route;
  const gameId = route.params.gameId;
  const scrollRef = React.useRef(null);
  const dispatch = useDispatch();
  const gamesState = useSelector(function (state) {
    return state.games;
  });
  const items = gamesState.items;
  const selectedGame = gamesState.selectedGame;
  const detailLoading = gamesState.detailLoading;
  const error = gamesState.error;
  function findGameById() {
    for (let i = 0; i < items.length; i++) {
      const currentGame = items[i];
      if (currentGame.id === gameId) {
        return currentGame;
      }
    }
    return null;
  }

  useFocusEffect(
    React.useCallback(function () {
      if (scrollRef.current != null) {
        scrollRef.current.scrollTo({
          y: 0,
          animated: false,
        });
      }
    }, [])
  );

  const cachedGame = findGameById();
  let game = null;
  if (selectedGame != null && selectedGame.id === gameId) {
    game = selectedGame;
  } else if (cachedGame != null) {
    game = cachedGame;
  }

  React.useEffect(function () {
    dispatch(fetchGameDetail(gameId));
  }, [dispatch, gameId]);

  if (detailLoading && game == null) {
    return (
      <LoadingState message="Loading game detail..." />
    );
  }

  if (game == null) {
    let errorMessage = 'Game data was not found.';
    if (error != null) {
      errorMessage = error;
    }
    return (
      <View style={styles.centerState}>
        <Text style={styles.errorTitle}>
          Cannot open this game
        </Text>

        <Text style={styles.errorText}>
          {errorMessage}
        </Text>
      </View>
    );
  }
  let priceText = 'Free';
  const priceNumber = Number(game.price);
  if (priceNumber !== 0) {
    priceText = '$' + priceNumber.toFixed(2);
  }

  let genreText = 'Unknown genre';
  if (game.genre != null && game.genre !== '') {
    genreText = game.genre;
  }

  let developerText = 'Not available';
  if (game.developer != null && game.developer !== '') {
    developerText = game.developer;
  }

  let publisherText = 'Not available';
  if (game.publisher != null && game.publisher !== '') {
    publisherText = game.publisher;
  }

  let releaseDateText = 'Not available';
  if (game.releaseDate != null && game.releaseDate !== '') {
    releaseDateText = game.releaseDate;
  }

  let descriptionText = 'No description available.';
  if (game.description != null && game.description !== '') {
    descriptionText = game.description;
  }

  let heroContent;
  if (game.coverImageUrl != null && game.coverImageUrl !== '') {
    const imageSource = {
      uri: game.coverImageUrl,
    };
    heroContent = (
      <ImageBackground
        source={imageSource}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroBottom}>
            <Text style={styles.price}>
              {priceText}
            </Text>
            <Text style={styles.title}>
              {game.title}
            </Text>
            <Text style={styles.heroMetadata}>
              {genreText} • {publisherText}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  } else {
    heroContent = (
      <View style={styles.heroFallback}>
        <View style={styles.heroBottom}>
          <Text style={styles.price}>
            {priceText}
          </Text>
          <Text style={styles.title}>
            {game.title}
          </Text>
          <Text style={styles.heroMetadata}>
            {genreText} • {publisherText}
          </Text>
        </View>
      </View>
    );
  }
  function openGameMedia() {
    navigation.navigate('GameMedia', {
      gameId: gameId,
    });
  }

  function openRequirements() {
    navigation.navigate('SystemRequirements', {
      gameId: gameId,
    });
  }

  function openCommunityRating() {
    navigation.navigate('CommunityRating', {
      gameId: gameId,
    });
  }

  function openReviews() {
    navigation.navigate('ReviewList', {
      gameId: gameId,
    });
  }
  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {heroContent}
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>
          About This Game
        </Text>
        <Text style={styles.description}>
          {descriptionText}
        </Text>
        <View style={styles.divider} />
        <View style={styles.informationGrid}>
          <View style={styles.informationItem}>
            <Text style={styles.informationLabel}>
              DEVELOPER
            </Text>
            <Text style={styles.informationValue}>
              {developerText}
            </Text>
          </View>
          <View style={styles.informationItem}>
            <Text style={styles.informationLabel}>
              PUBLISHER
            </Text>
            <Text style={styles.informationValue}>
              {publisherText}
            </Text>
          </View>
          <View style={styles.informationItem}>
            <Text style={styles.informationLabel}>
              RELEASE DATE
            </Text>
            <Text style={styles.informationValue}>
              {releaseDateText}
            </Text>
          </View>
        </View>
        <View style={styles.actionGrid}>
          <Pressable
            onPress={openGameMedia}
            style={styles.actionCard}
          >
            <Text style={styles.actionIcon}>
              ▣
            </Text>
            <Text style={styles.actionTitle}>
              Game Media
            </Text>
            <Text style={styles.actionDescription}>
              Screenshots and trailer
            </Text>
          </Pressable>
          <Pressable
            onPress={openRequirements}
            style={styles.actionCard}
          >
            <Text style={styles.actionIcon}>
              ⚙
            </Text>
            <Text style={styles.actionTitle}>
              System Specs
            </Text>
            <Text style={styles.actionDescription}>
              Minimum and recommended
            </Text>
          </Pressable>
          <Pressable
            onPress={openCommunityRating}
            style={styles.actionCard}
          >
            <Text style={styles.actionIcon}>
              ▥
            </Text>
            <Text style={styles.actionTitle}>
              Community
            </Text>
            <Text style={styles.actionDescription}>
              Worth It ratings
            </Text>
          </Pressable>
          <Pressable
            onPress={openReviews}
            style={styles.actionCard}
          >
            <Text style={styles.actionIcon}>
              ★
            </Text>
            <Text style={styles.actionTitle}>
              Reviews
            </Text>
            <Text style={styles.actionDescription}>
              Player opinions
            </Text>
          </Pressable>
        </View>
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
    paddingBottom: 45,
  },
  hero: {
    width: '100%',
    height: 380,
  },
  heroFallback: {
    width: '100%',
    height: 380,
    justifyContent: 'flex-end',
    backgroundColor: colors.surfaceHigh,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  heroBottom: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  price: {
    marginBottom: 10,
    color: '#4EDEA3',
    fontSize: 22,
    fontWeight: '800',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    lineHeight: 48,
  },
  heroMetadata: {
    marginTop: 8,
    color: '#BBCABF',
    fontSize: 15,
    fontWeight: '600',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  description: {
    marginTop: 13,
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 25,
  },
  divider: {
    height: 1,
    marginTop: 24,
    marginBottom: 22,
    backgroundColor: '#353436',
  },
  informationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  informationItem: {
    width: '50%',
    marginBottom: 22,
    paddingRight: 12,
  },
  informationLabel: {
    color: '#BBCABF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  informationValue: {
    marginTop: 6,
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  actionCard: {
    width: '48%',
    minHeight: 145,
    marginBottom: 14,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#201F20',
  },
  actionIcon: {
    color: '#4EDEA3',
    fontSize: 25,
    fontWeight: '900',
  },
  actionTitle: {
    marginTop: 18,
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  actionDescription: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
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
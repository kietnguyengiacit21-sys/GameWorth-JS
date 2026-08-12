import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import LoadingState from '../../components/LoadingState';
import { fetchGames } from '../../features/games/gamesSlice';
import { colors } from '../../theme/colors';


function HomeScreen(props) {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const gamesState = useSelector(function (state) {
    return state.games;
  });

  const items = gamesState.items;
  const listLoading = gamesState.listLoading;

  React.useEffect(function () {
    if (items.length === 0) {
      dispatch(fetchGames());
    }
  }, [dispatch, items.length]);

  let featuredGame = null;
  if (items.length > 0) {
    featuredGame = items[0];
  }

  function openSearch() {
    navigation.navigate('SearchGame');
  }

  function openFilter() {
    navigation.navigate('FilterGame');
  }

  function openGameList() {
    navigation.navigate('Games');
  }

  function openFeaturedGame() {
    if (featuredGame == null) {
      return;
    }

    navigation.navigate('GameDetail', {
      gameId: featuredGame.id,
    });
  }


  function openGameDetail(gameId) {
    navigation.navigate('GameDetail', {
      gameId: gameId,
    });
  }

  let featuredContent = null;
  if (featuredGame != null) {
    let priceText = 'Free';
    const priceNumber = Number(featuredGame.price);
    if (priceNumber !== 0) {
      priceText = '$' + priceNumber.toFixed(2);
    }

    let metadataText = '';
    if (featuredGame.genre != null && featuredGame.genre !== '') {
      metadataText = featuredGame.genre;
    }
    if (featuredGame.platform != null && featuredGame.platform !== '') {
      if (metadataText !== '') {
        metadataText = metadataText + ' • ';
      }
      metadataText = metadataText + featuredGame.platform;
    }

    const imageSource = {
      uri: featuredGame.coverImageUrl,
    };


    featuredContent = (
      <Pressable onPress={openFeaturedGame}>
        <ImageBackground
          source={imageSource}
          style={styles.featuredCard}
          imageStyle={styles.featuredImage}
          resizeMode="cover"
        >
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredInformation}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>
                  FEATURED
                </Text>
              </View>
              <Text
                style={styles.featuredTitle}
                numberOfLines={2}
              >
                {featuredGame.title}
              </Text>
              <Text style={styles.featuredMetadata}>
                {metadataText}
              </Text>
              <Text style={styles.featuredPrice}>
                {priceText}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    );
  }

  function renderPopularGame(game, index) {
    if (index >= 4) {
      return null;
    }
    let priceText = 'Free';
    const priceNumber = Number(game.price);
    if (priceNumber !== 0) {
      priceText = '$' + priceNumber.toFixed(2);
    }

    function handlePress() {
      openGameDetail(game.id);
    }

    const imageSource = {
      uri: game.coverImageUrl,
    };

    return (
      <Pressable
        key={game.id.toString()}
        style={styles.gameCard}
        onPress={handlePress}
      >
        <ImageBackground
          source={imageSource}
          style={styles.gameImage}
          imageStyle={styles.gameImageBorder}
          resizeMode="cover"
        />
        <View style={styles.gameInformation}>
          <Text
            style={styles.gameTitle}
            numberOfLines={1}
          >
            {game.title}
          </Text>
          <Text style={styles.gamePrice}>
            {priceText}
          </Text>
        </View>
      </Pressable>
    );
  }

  if (listLoading && items.length === 0) {
    return (
      <LoadingState message="Loading GameWorth..." />
    );
  }
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>
              GW
            </Text>
          </View>
          <Text style={styles.headerTitle}>
            Discovery
          </Text>
        </View>
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>
            G
          </Text>
        </View>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          Find Your Next Game
        </Text>
        <Text style={styles.subtitle}>
          Discover the titles actually worth your time and money.
        </Text>
        {featuredContent}
        <View style={styles.quickActions}>
          <Pressable
            style={styles.quickCard}
            onPress={openSearch}
          >
            <Text style={styles.quickIcon}>
              ⌕
            </Text>
            <Text style={styles.quickTitle}>
              Search Games
            </Text>
            <Text style={styles.quickDescription}>
              Find specific titles
            </Text>
          </Pressable>
          <Pressable
            style={styles.quickCard}
            onPress={openFilter}
          >
            <Text style={styles.quickIcon}>
              ☷
            </Text>
            <Text style={styles.quickTitle}>
              Filter Games
            </Text>
            <Text style={styles.quickDescription}>
              Browse by genre
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Popular Games
          </Text>
        </View>
        <View style={styles.gameGrid}>
          {items.map(renderPopularGame)}
        </View>
        <Pressable
          style={styles.browseButton}
          onPress={openGameList}
        >
          <Text style={styles.browseButtonText}>
            Browse All Games
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#131314',
  },

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131314',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#201F20',
  },

  logoText: {
    color: '#4EDEA3',
    fontSize: 10,
    fontWeight: '900',
  },


  headerTitle: {
    marginLeft: 9,
    color: '#E5E2E3',
    fontSize: 20,
    fontWeight: '700',
  },

  profileCircle: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3C4A42',
    borderRadius: 17,
    backgroundColor: '#201F20',
  },

  profileText: {
    color: '#4EDEA3',
    fontSize: 14,
    fontWeight: '900',
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
  },

  heading: {
    color: '#E5E2E3',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: '#BBCABF',
    fontSize: 16,
    lineHeight: 24,
  },

  featuredCard: {
    width: '100%',
    height: 360,
    justifyContent: 'flex-end',
  },

  featuredImage: {
    borderRadius: 16,
  },

  featuredOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
  },

  featuredInformation: {
    padding: 16,
    paddingTop: 190,
  },

  featuredBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'rgba(78, 222, 163, 0.14)',
  },

  featuredBadgeText: {
    color: '#4EDEA3',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },

  featuredTitle: {
    marginTop: 9,
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
  },

  featuredMetadata: {
    marginTop: 5,
    color: '#D5D5D5',
    fontSize: 14,
    lineHeight: 20,
  },

  featuredPrice: {
    marginTop: 13,
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
  },

  quickCard: {
    width: '48%',
    minHeight: 158,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#201F20',
  },

  quickIcon: {
    marginBottom: 13,
    color: '#4EDEA3',
    fontSize: 34,
    fontWeight: '400',
  },

  quickTitle: {
    color: '#E5E2E3',
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    textAlign: 'center',
  },

  quickDescription: {
    marginTop: 3,
    color: '#BBCABF',
    fontSize: 14,
    textAlign: 'center',
  },

  sectionHeader: {
    marginTop: 27,
    marginBottom: 16,
  },

  sectionTitle: {
    color: '#E5E2E3',
    fontSize: 20,
    fontWeight: '700',
  },

  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gameCard: {
    width: '48.5%',
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#201F20',
  },

  gameImage: {
    width: '100%',
    height: 238,
  },

  gameImageBorder: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  gameInformation: {
    padding: 8,
  },

  gameTitle: {
    color: '#E5E2E3',
    fontSize: 18,
    fontWeight: '700',
  },

  gamePrice: {
    marginTop: 4,
    color: '#BBCABF',
    fontSize: 14,
  },

  browseButton: {
    marginTop: 32,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#4EDEA3',
  },

  browseButtonText: {
    color: '#003824',
    fontSize: 19,
    fontWeight: '700',
  },

});


export default HomeScreen;
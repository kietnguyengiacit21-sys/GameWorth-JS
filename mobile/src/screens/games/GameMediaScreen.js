import React from 'react';

import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import LoadingState from '../../components/LoadingState';
import { fetchGameDetail, fetchGameMedia } from '../../features/games/gamesSlice';
import { colors } from '../../theme/colors';


const screenWidth = Dimensions.get('window').width;
const galleryWidth = screenWidth - 40;


function GameMediaScreen(props) {
  const route = props.route;
  const gameId = route.params.gameId;

  const dispatch = useDispatch();

  const gamesState = useSelector(function (state) {
    return state.games;
  });

  const items = gamesState.items;
  const selectedGame = gamesState.selectedGame;
  const mediaItems = gamesState.mediaItems;
  const mediaLoading = gamesState.mediaLoading;
  const mediaError = gamesState.mediaError;

  const indexState = React.useState(0);
  const currentIndex = indexState[0];
  const setCurrentIndex = indexState[1];

  const heroScrollRef = React.useRef(null);


  // =========================================
  // TÌM GAME
  // =========================================

  function findGameById() {
    for (let i = 0; i < items.length; i++) {
      const currentGame = items[i];

      if (currentGame.id === gameId) {
        return currentGame;
      }
    }

    return null;
  }


  const cachedGame = findGameById();

  let game = null;

  if (selectedGame != null && selectedGame.id === gameId) {
    game = selectedGame;
  } else if (cachedGame != null) {
    game = cachedGame;
  }


  // =========================================
  // LOAD DATA
  // =========================================

  React.useEffect(function () {
    setCurrentIndex(0);
    dispatch(fetchGameMedia(gameId));

    if (selectedGame == null || selectedGame.id !== gameId) {
      dispatch(fetchGameDetail(gameId));
    }
  }, [dispatch, gameId]);


  // =========================================
  // HERO IMAGE
  // =========================================

  function renderHeroImage(media) {
    const imageSource = {
      uri: media.imageUrl,
    };

    return (
      <Image
        key={media.id.toString()}
        source={imageSource}
        style={styles.heroImage}
        fadeDuration={0}
        onError={function (event) {
          console.log('HERO IMAGE ERROR:', media.imageUrl, event.nativeEvent);
        }}
      />
    );
  }


  function handleHeroScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / galleryWidth);

    if (newIndex >= 0 && newIndex < mediaItems.length) {
      setCurrentIndex(newIndex);
    }
  }


  // =========================================
  // THUMBNAIL
  // =========================================

  function selectMedia(index) {
    setCurrentIndex(index);

    if (heroScrollRef.current != null) {
      heroScrollRef.current.scrollTo({
        x: galleryWidth * index,
        y: 0,
        animated: true,
      });
    }
  }


  function renderThumbnail(media, index) {
    let thumbnailStyle = styles.thumbnail;

    if (index === currentIndex) {
      thumbnailStyle = [styles.thumbnail, styles.selectedThumbnail];
    }


    function handleThumbnailPress() {
      selectMedia(index);
    }


    const imageSource = {
      uri: media.imageUrl,
    };


    return (
      <Pressable
        key={media.id.toString()}
        onPress={handleThumbnailPress}
        style={thumbnailStyle}
      >
        <Image
          source={imageSource}
          style={styles.thumbnailImage}
          fadeDuration={0}
          onError={function (event) {
            console.log('THUMBNAIL ERROR:', media.imageUrl, event.nativeEvent);
          }}
        />
      </Pressable>
    );
  }


  // =========================================
  // SCREENSHOT GRID
  // =========================================

  function renderScreenshot(media) {
    const imageSource = {
      uri: media.imageUrl,
    };

    return (
      <Image
        key={media.id.toString()}
        source={imageSource}
        style={styles.screenshot}
        fadeDuration={0}
        onError={function (event) {
          console.log('SCREENSHOT ERROR:', media.imageUrl, event.nativeEvent);
        }}
      />
    );
  }


  // =========================================
  // TRAILER
  // =========================================

  async function openTrailer() {
    if (game == null) {
      return;
    }

    if (game.trailerUrl == null || game.trailerUrl === '') {
      return;
    }

    await Linking.openURL(game.trailerUrl);
  }


  // =========================================
  // LOADING
  // =========================================

  if (mediaLoading && mediaItems.length === 0) {
    return (
      <LoadingState message="Loading game media..." />
    );
  }


  // =========================================
  // GAME KHÔNG TỒN TẠI
  // =========================================

  if (game == null) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Cannot open Game Media
        </Text>
      </View>
    );
  }


  // =========================================
  // GAME CHƯA CÓ MEDIA
  // =========================================

  if (mediaItems.length === 0) {
    let message = 'No media available for this game.';

    if (mediaError != null) {
      message = mediaError;
    }

    return (
      <View style={styles.center}>
        <Text style={styles.gameTitle}>
          {game.title}
        </Text>

        <Text style={styles.emptyText}>
          {message}
        </Text>
      </View>
    );
  }


  // =========================================
  // TRAILER
  // =========================================

  let trailerText = 'Watch Trailer';
  let trailerButtonStyle = styles.trailerButton;

  if (game.trailerUrl == null || game.trailerUrl === '') {
    trailerText = 'Trailer Unavailable';
    trailerButtonStyle = [styles.trailerButton, styles.disabledTrailerButton];
  }


  // =========================================
  // CHỈ LẤY 4 ẢNH CHO GRID
  // =========================================

  const screenshotItems = mediaItems.slice(0, 4);


  // =========================================
  // RENDER
  // =========================================

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.gameTitle}>
        {game.title}
      </Text>

      <Text style={styles.subtitle}>
        Media Gallery
      </Text>


      <View style={styles.heroContainer}>

        <ScrollView
          ref={heroScrollRef}
          horizontal={true}
          pagingEnabled={true}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleHeroScroll}
        >
          {mediaItems.map(renderHeroImage)}
        </ScrollView>


        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {currentIndex + 1} / {mediaItems.length}
          </Text>
        </View>

      </View>


      <ScrollView
        horizontal={true}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailList}
      >
        {mediaItems.map(renderThumbnail)}
      </ScrollView>


      <Text style={styles.sectionTitle}>
        Screenshots
      </Text>


      <View style={styles.screenshotGrid}>
        {screenshotItems.map(renderScreenshot)}
      </View>


      <Pressable
        onPress={openTrailer}
        style={trailerButtonStyle}
      >
        <Text style={styles.trailerText}>
          ▶  {trailerText}
        </Text>
      </Pressable>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 45,
  },

  gameTitle: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '900',
  },

  subtitle: {
    marginTop: 5,
    marginBottom: 24,
    color: colors.textMuted,
    fontSize: 17,
  },

  heroContainer: {
    width: galleryWidth,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surfaceHigh,
  },

  heroImage: {
    width: galleryWidth,
    height: 220,
    resizeMode: 'cover',
  },

  counter: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
  },

  counterText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  thumbnailList: {
    marginTop: 14,
  },

  thumbnail: {
    width: 95,
    height: 60,
    marginRight: 9,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.surfaceHigh,
  },

  selectedThumbnail: {
    borderColor: '#4EDEA3',
  },

  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
    resizeMode: 'cover',
  },

  sectionTitle: {
    marginTop: 30,
    marginBottom: 15,
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },

  screenshotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  screenshot: {
    width: '48.5%',
    height: 170,
    marginBottom: 10,
    borderRadius: 14,
    resizeMode: 'cover',
    backgroundColor: colors.surfaceHigh,
  },

  trailerButton: {
    marginTop: 22,
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#4EDEA3',
  },

  disabledTrailerButton: {
    opacity: 0.4,
  },

  trailerText: {
    color: '#003824',
    fontSize: 18,
    fontWeight: '900',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: colors.background,
  },

  emptyText: {
    marginTop: 15,
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 15,
  },

  errorTitle: {
    color: colors.error,
    fontSize: 20,
    fontWeight: '800',
  },

});


export default GameMediaScreen;
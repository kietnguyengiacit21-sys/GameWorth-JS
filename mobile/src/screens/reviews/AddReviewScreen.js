import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearReviewsError,
  submitReview,
} from '../../features/reviews/reviewsSlice';


function AddReviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [rating, setRating] = React.useState(0);
  const [verdict, setVerdict] = React.useState(null);
  const [comment, setComment] = React.useState('');

  const authState = useSelector(function (state) {
    return state.auth;
  });

  const gamesState = useSelector(function (state) {
    return state.games;
  });

  const reviewsState = useSelector(function (state) {
    return state.reviews;
  });

  const saving = reviewsState.saving;
  const error = reviewsState.error;


  let gameId = null;

  if (route.params != null && route.params.gameId != null) {
    gameId = Number(route.params.gameId);
  }


  let game = null;

  if (route.params != null && route.params.game != null) {
    game = route.params.game;
  }


  if (
    game == null &&
    gamesState.selectedGame != null &&
    Number(gamesState.selectedGame.id) === gameId
  ) {
    game = gamesState.selectedGame;
  }


  if (game == null && gamesState.items != null) {
    for (let i = 0; i < gamesState.items.length; i++) {
      if (Number(gamesState.items[i].id) === gameId) {
        game = gamesState.items[i];
        break;
      }
    }
  }


  React.useEffect(function () {
    dispatch(clearReviewsError());
  }, [dispatch]);


  function goBack() {
    navigation.goBack();
  }


  function selectRating(value) {
    setRating(value);
  }


  function selectWorthIt() {
    setVerdict('WORTH_IT');
  }


  function selectNotWorthIt() {
    setVerdict('NOT_WORTH_IT');
  }


  async function handleSubmit() {
    dispatch(clearReviewsError());

    if (!authState.isLoggedIn) {
      Alert.alert(
        'Login required',
        'You need to log in before writing a review.'
      );

      return;
    }


    if (gameId == null) {
      Alert.alert(
        'Game not found',
        'No game was selected.'
      );

      return;
    }


    if (rating < 1 || rating > 5) {
      Alert.alert(
        'Rating required',
        'Choose a rating from 1 to 5 stars.'
      );

      return;
    }


    if (verdict == null) {
      Alert.alert(
        'Verdict required',
        'Choose Worth It or Not Worth It.'
      );

      return;
    }


    const data = {
      gameId: gameId,
      rating: rating,
      verdict: verdict,
      comment: comment.trim(),
    };


    const result = await dispatch(submitReview(data));


    if (submitReview.fulfilled.match(result)) {
      goBack();
    }
  }


  function renderStars() {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      let starStyle = styles.starInactive;

      if (i <= rating) {
        starStyle = styles.starActive;
      }


      function handleStarPress() {
        selectRating(i);
      }


      stars.push(
        <Pressable
          key={i}
          style={styles.starButton}
          onPress={handleStarPress}
        >
          <Text style={starStyle}>
            ★
          </Text>
        </Pressable>
      );
    }

    return stars;
  }


  if (game == null) {
    return (
      <SafeAreaView
        style={styles.screen}
        edges={['bottom']}
      >
        <View style={styles.noGameContainer}>
          <Text style={styles.noGameTitle}>
            No game selected
          </Text>

          <Text style={styles.noGameDescription}>
            Go back and select a game before writing a review.
          </Text>

          <Pressable
            style={styles.smallButton}
            onPress={goBack}
          >
            <Text style={styles.smallButtonText}>
              GO BACK
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }


  let gameTitle = 'Unknown Game';

  if (game.title != null && game.title !== '') {
    gameTitle = game.title;
  }


  let gameMetadata = '';

  if (game.genre != null && game.genre !== '') {
    gameMetadata = game.genre;
  }


  if (game.developer != null && game.developer !== '') {
    if (gameMetadata !== '') {
      gameMetadata += ' • ';
    }

    gameMetadata += game.developer;
  }


  let coverContent;

  if (
    game.coverImageUrl != null &&
    game.coverImageUrl !== ''
  ) {
    coverContent = (
      <Image
        source={{ uri: game.coverImageUrl }}
        style={styles.gameCover}
        resizeMode="cover"
      />
    );
  } else {
    coverContent = (
      <View style={styles.coverFallback}>
        <Text style={styles.coverFallbackText}>
          GW
        </Text>
      </View>
    );
  }


  let worthCardStyle = styles.verdictCard;
  let worthIconStyle = styles.verdictIconInactive;
  let worthTextStyle = styles.verdictTextInactive;


  if (verdict === 'WORTH_IT') {
    worthCardStyle = [
      styles.verdictCard,
      styles.worthCardSelected,
    ];

    worthIconStyle = styles.worthIconSelected;
    worthTextStyle = styles.worthTextSelected;
  }


  let notWorthCardStyle = styles.verdictCard;
  let notWorthIconStyle = styles.verdictIconInactive;
  let notWorthTextStyle = styles.verdictTextInactive;


  if (verdict === 'NOT_WORTH_IT') {
    notWorthCardStyle = [
      styles.verdictCard,
      styles.notWorthCardSelected,
    ];

    notWorthIconStyle = styles.notWorthIconSelected;
    notWorthTextStyle = styles.notWorthTextSelected;
  }


  let errorContent = null;

  if (error != null) {
    errorContent = (
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    );
  }


  let submitContent;

  if (saving) {
    submitContent = (
      <ActivityIndicator
        size="small"
        color="#003824"
      />
    );
  } else {
    submitContent = (
      <Text style={styles.submitButtonText}>
        Submit Review
      </Text>
    );
  }


  return (
    <SafeAreaView
      style={styles.screen}
      edges={['bottom']}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="padding"
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.gameCard}>
            {coverContent}

            <View style={styles.gameInformation}>
              <Text style={styles.selectedLabel}>
                SELECTED GAME
              </Text>

              <Text
                style={styles.gameTitle}
                numberOfLines={1}
              >
                {gameTitle}
              </Text>

              <Text
                style={styles.gameMetadata}
                numberOfLines={2}
              >
                {gameMetadata}
              </Text>
            </View>
          </View>


          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>
              Your Rating
            </Text>

            <View style={styles.starsRow}>
              {renderStars()}
            </View>

            <Text style={styles.ratingValue}>
              {rating} / 5
            </Text>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Verdict
            </Text>

            <View style={styles.verdictRow}>
              <Pressable
                style={worthCardStyle}
                onPress={selectWorthIt}
              >
                <Text style={worthIconStyle}>
                  ✓
                </Text>

                <Text style={worthTextStyle}>
                  WORTH IT
                </Text>
              </Pressable>


              <Pressable
                style={notWorthCardStyle}
                onPress={selectNotWorthIt}
              >
                <Text style={notWorthIconStyle}>
                  ×
                </Text>

                <Text style={notWorthTextStyle}>
                  NOT WORTH IT
                </Text>
              </Pressable>
            </View>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Review
            </Text>

            <TextInput
              style={styles.reviewInput}
              value={comment}
              onChangeText={setComment}
              placeholder="Share your thoughts..."
              placeholderTextColor="#86948A"
              multiline={true}
              textAlignVertical="top"
              maxLength={1000}
            />

            <Text style={styles.characterCount}>
              {comment.length} / 1000
            </Text>
          </View>


          {errorContent}


          <Pressable
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={saving}
          >
            {submitContent}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#131314',
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
  },

  gameCard: {
    minHeight: 132,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#201F20',
  },

  gameCover: {
    width: 72,
    height: 104,
    borderRadius: 10,
    backgroundColor: '#2A2A2B',
  },

  coverFallback: {
    width: 72,
    height: 104,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2B',
  },

  coverFallbackText: {
    color: '#4EDEA3',
    fontSize: 16,
    fontWeight: '900',
  },

  gameInformation: {
    flex: 1,
    marginLeft: 18,
  },

  selectedLabel: {
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },

  gameTitle: {
    marginTop: 8,
    color: '#E5E2E3',
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '800',
  },

  gameMetadata: {
    marginTop: 6,
    color: '#BBCABF',
    fontSize: 15,
    lineHeight: 21,
  },

  ratingSection: {
    marginTop: 38,
    alignItems: 'center',
  },

  section: {
    marginTop: 32,
  },

  sectionTitle: {
    color: '#E5E2E3',
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '800',
  },

  starsRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  starButton: {
    width: 54,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },

  starInactive: {
    color: '#353436',
    fontSize: 47,
  },

  starActive: {
    color: '#FFB95F',
    fontSize: 47,
  },

  ratingValue: {
    marginTop: 5,
    color: '#BBCABF',
    fontSize: 13,
  },

  verdictRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  verdictCard: {
    width: '48%',
    height: 116,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201F20',
  },

  worthCardSelected: {
    borderColor: 'rgba(78, 222, 163, 0.55)',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },

  notWorthCardSelected: {
    borderColor: 'rgba(255, 180, 171, 0.55)',
    backgroundColor: 'rgba(147, 0, 10, 0.12)',
  },

  verdictIconInactive: {
    color: '#BBCABF',
    fontSize: 38,
    fontWeight: '400',
  },

  verdictTextInactive: {
    marginTop: 10,
    color: '#BBCABF',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  worthIconSelected: {
    color: '#4EDEA3',
    fontSize: 38,
    fontWeight: '900',
  },

  worthTextSelected: {
    marginTop: 10,
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  notWorthIconSelected: {
    color: '#FFB4AB',
    fontSize: 38,
    fontWeight: '500',
  },

  notWorthTextSelected: {
    marginTop: 10,
    color: '#FFB4AB',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  reviewInput: {
    minHeight: 160,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    color: '#E5E2E3',
    backgroundColor: '#0E0E0F',
    fontSize: 16,
    lineHeight: 23,
  },

  characterCount: {
    marginTop: 6,
    alignSelf: 'flex-end',
    color: '#86948A',
    fontSize: 11,
  },

  errorBox: {
    marginTop: 20,
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'rgba(147, 0, 10, 0.18)',
  },

  errorText: {
    color: '#FFB4AB',
    fontSize: 13,
    textAlign: 'center',
  },

  submitButton: {
    width: '100%',
    height: 58,
    marginTop: 30,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4EDEA3',
  },

  submitButtonText: {
    color: '#003824',
    fontSize: 20,
    fontWeight: '800',
  },

  noGameContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noGameTitle: {
    color: '#E5E2E3',
    fontSize: 20,
    fontWeight: '700',
  },

  noGameDescription: {
    marginTop: 8,
    color: '#BBCABF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  smallButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 20,
    backgroundColor: '#2A2A2B',
  },

  smallButtonText: {
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontWeight: '700',
  },
});
export default AddReviewScreen;
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

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearReviewsError,
  fetchReviewDetail,
  saveReview,
} from '../../features/reviews/reviewsSlice';


function EditReviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [rating, setRating] = React.useState(0);
  const [verdict, setVerdict] = React.useState(null);
  const [comment, setComment] = React.useState('');
  const [formReady, setFormReady] = React.useState(false);

  const authState = useSelector(function (state) {
    return state.auth;
  });

  const reviewsState = useSelector(function (state) {
    return state.reviews;
  });

  const review = reviewsState.selectedReview;
  const loading = reviewsState.loading;
  const saving = reviewsState.saving;
  const error = reviewsState.error;

  let reviewId = null;
  if (route.params != null && route.params.reviewId != null) {
    reviewId = Number(route.params.reviewId);
  }
  React.useEffect(function () {
    if (isFocused && reviewId != null) {
      dispatch(clearReviewsError());
      dispatch(fetchReviewDetail(reviewId));
    }
  }, [dispatch, isFocused, reviewId]);

  React.useEffect(function () {
    if (
      review != null &&
      Number(review.id) === reviewId
    ) {
      setRating(Number(review.rating));
      setVerdict(review.verdict);

      if (review.comment != null) {
        setComment(review.comment);
      } else {
        setComment('');
      }
      setFormReady(true);
    }
  }, [review, reviewId]);
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
  function getRatingLabel() {
    if (rating === 1) {
      return 'POOR';
    }
    if (rating === 2) {
      return 'FAIR';
    }
    if (rating === 3) {
      return 'GOOD';
    }
    if (rating === 4) {
      return 'GREAT';
    }
    if (rating === 5) {
      return 'MASTERPIECE';
    }
    return 'SELECT RATING';
  }
  function getCurrentUserId() {
    if (authState.user == null) {
      return null;
    }
    if (authState.user.id != null) {
      return Number(authState.user.id);
    }
    if (authState.user.userId != null) {
      return Number(authState.user.userId);
    }
    return null;
  }
  function isReviewOwner() {
    if (!authState.isLoggedIn) {
      return false;
    }
    if (review == null) {
      return false;
    }
    const currentUserId = getCurrentUserId();
    if (currentUserId == null) {
      return false;
    }
    return currentUserId === Number(review.userId);
  }
  async function handleSave() {
    dispatch(clearReviewsError());
    if (!authState.isLoggedIn) {
      Alert.alert(
        'Login required',
        'You need to log in before editing a review.'
      );
      return;
    }
    if (!isReviewOwner()) {
      Alert.alert(
        'Access denied',
        'You can only edit your own review.'
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
      reviewId: reviewId,
      rating: rating,
      verdict: verdict,
      comment: comment.trim(),
    };

    const result = await dispatch(saveReview(data));
    if (saveReview.fulfilled.match(result)) {
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


      function handlePress() {
        selectRating(i);
      }


      stars.push(
        <Pressable
          key={i}
          style={styles.starButton}
          onPress={handlePress}
        >
          <Text style={starStyle}>
            ★
          </Text>
        </Pressable>
      );
    }

    return stars;
  }


  if (reviewId == null) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>
            Review not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }


  let correctReviewLoaded = false;

  if (
    review != null &&
    Number(review.id) === reviewId &&
    formReady
  ) {
    correctReviewLoaded = true;
  }

  if (loading || !correctReviewLoaded) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <View style={styles.centerState}>
          <ActivityIndicator
            size="large"
            color="#4EDEA3"
          />

          <Text style={styles.loadingText}>
            Loading review...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  if (error != null && review == null) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>
            Could not load review
          </Text>

          <Text style={styles.errorDescription}>
            {error}
          </Text>

          <Pressable
            style={styles.cancelSmallButton}
            onPress={goBack}
          >
            <Text style={styles.cancelSmallButtonText}>
              GO BACK
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  if (!isReviewOwner()) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>
            You cannot edit this review
          </Text>

          <Text style={styles.errorDescription}>
            Only the owner of this review can edit it.
          </Text>

          <Pressable
            style={styles.cancelSmallButton}
            onPress={goBack}
          >
            <Text style={styles.cancelSmallButtonText}>
              GO BACK
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }


  let gameTitle = 'Unknown Game';

  if (
    review.gameTitle != null &&
    review.gameTitle !== ''
  ) {
    gameTitle = review.gameTitle;
  }


  let gameGenre = 'GAME';

  if (
    review.gameGenre != null &&
    review.gameGenre !== ''
  ) {
    gameGenre = review.gameGenre.toUpperCase();
  }


  let coverContent;

  if (
    review.gameCoverImageUrl != null &&
    review.gameCoverImageUrl !== ''
  ) {
    coverContent = (
      <Image
        source={{ uri: review.gameCoverImageUrl }}
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
      styles.worthSelected,
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
      styles.notWorthSelected,
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


  let saveButtonContent;

  if (saving) {
    saveButtonContent = (
      <ActivityIndicator
        size="small"
        color="#E6ECFF"
      />
    );
  } else {
    saveButtonContent = (
      <Text style={styles.saveButtonText}>
        SAVE CHANGES
      </Text>
    );
  }


  const ratingLabel = getRatingLabel();


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
          <View style={styles.gameHeader}>
            {coverContent}

            <View style={styles.gameInformation}>
              <Text
                style={styles.gameTitle}
                numberOfLines={2}
              >
                {gameTitle}
              </Text>

              <Text
                style={styles.gameGenre}
                numberOfLines={1}
              >
                {gameGenre}
              </Text>
            </View>
          </View>


          <View style={styles.ratingCard}>
            <Text style={styles.sectionTitle}>
              Overall Rating
            </Text>

            <View style={styles.starsRow}>
              {renderStars()}
            </View>

            <Text style={styles.ratingLabel}>
              {ratingLabel}
            </Text>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              The Verdict
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
              Your Thoughts
            </Text>

            <TextInput
              style={styles.reviewInput}
              value={comment}
              onChangeText={setComment}
              placeholder="What makes this game stand out?"
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
            style={styles.saveButton}
            onPress={handleSave}
            disabled={saving}
          >
            {saveButtonContent}
          </Pressable>


          <Pressable
            style={styles.cancelButton}
            onPress={goBack}
            disabled={saving}
          >
            <Text style={styles.cancelButtonText}>
              CANCEL
            </Text>
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
    paddingBottom: 44,
  },

  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  gameCover: {
    width: 76,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#2A2A2B',
  },

  coverFallback: {
    width: 76,
    height: 100,
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
    marginLeft: 20,
  },

  gameTitle: {
    color: '#E5E2E3',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },

  gameGenre: {
    marginTop: 5,
    color: '#BBCABF',
    fontSize: 14,
    letterSpacing: 2,
  },

  ratingCard: {
    marginTop: 32,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#201F20',
  },

  section: {
    marginTop: 28,
  },

  sectionTitle: {
    color: '#E5E2E3',
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '800',
  },

  starsRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  starButton: {
    width: 52,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },

  starInactive: {
    color: '#353436',
    fontSize: 43,
  },

  starActive: {
    color: '#FFB95F',
    fontSize: 43,
  },

  ratingLabel: {
    marginTop: 14,
    color: '#FFB95F',
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },

  verdictRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  verdictCard: {
    width: '48%',
    height: 118,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201F20',
  },

  worthSelected: {
    borderColor: 'rgba(78, 222, 163, 0.40)',
    backgroundColor: 'rgba(78, 222, 163, 0.10)',
  },

  notWorthSelected: {
    borderColor: 'rgba(255, 180, 171, 0.40)',
    backgroundColor: 'rgba(255, 180, 171, 0.08)',
  },

  verdictIconInactive: {
    color: '#BBCABF',
    fontSize: 38,
  },

  verdictTextInactive: {
    marginTop: 11,
    color: '#BBCABF',
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },

  worthIconSelected: {
    color: '#4EDEA3',
    fontSize: 38,
    fontWeight: '900',
  },

  worthTextSelected: {
    marginTop: 11,
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },

  notWorthIconSelected: {
    color: '#FFB4AB',
    fontSize: 38,
  },

  notWorthTextSelected: {
    marginTop: 11,
    color: '#FFB4AB',
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  reviewInput: {
    minHeight: 180,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    color: '#E5E2E3',
    backgroundColor: '#080809',
    fontSize: 16,
    lineHeight: 24,
  },

  characterCount: {
    marginTop: 7,
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

  saveButton: {
    height: 56,
    marginTop: 30,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0566D9',
  },

  saveButtonText: {
    color: '#E6ECFF',
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
  },

  cancelButton: {
    height: 52,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    color: '#BBCABF',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },

  centerState: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 12,
    color: '#BBCABF',
    fontSize: 14,
  },

  errorTitle: {
    color: '#FFB4AB',
    fontSize: 19,
    fontWeight: '700',
  },

  errorDescription: {
    marginTop: 8,
    color: '#BBCABF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  cancelSmallButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 22,
    backgroundColor: '#2A2A2B',
  },

  cancelSmallButtonText: {
    color: '#BBCABF',
    fontSize: 12,
    fontWeight: '800',
  },
});
export default EditReviewScreen;
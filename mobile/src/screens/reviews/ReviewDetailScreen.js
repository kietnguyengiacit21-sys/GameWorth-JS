import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSelectedReview,
  fetchReviewDetail,
} from '../../features/reviews/reviewsSlice';

function ReviewDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const authState = useSelector(function (state) {
    return state.auth;
  });
  const reviewsState = useSelector(function (state) {
    return state.reviews;
  });
  const review = reviewsState.selectedReview;
  const loading = reviewsState.loading;
  const error = reviewsState.error;

  let reviewId = null;

  if (route.params != null && route.params.reviewId != null) {
    reviewId = Number(route.params.reviewId);
  }

  React.useEffect(function () {
    if (isFocused && reviewId != null) {
      dispatch(clearSelectedReview());
      dispatch(fetchReviewDetail(reviewId));
    }
  }, [dispatch, isFocused, reviewId]);

  function reload() {
    if (reviewId != null) {
      dispatch(fetchReviewDetail(reviewId));
    }
  }

  function openEditReview() {
    if (review == null) {
      return;
    }
    navigation.navigate('EditReview', {
      reviewId: review.id,
    });
  }

  function openDeleteReview() {
    if (review == null) {
      return;
    }
    navigation.navigate('DeleteReviewConfirmation', {
      reviewId: review.id,
      gameTitle: review.gameTitle,
    });
  }

  function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    return stars;
  }

  function getReviewDate(value) {
    if (value == null || value === '') {
      return '';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
  if (loading && review == null) {
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
            style={styles.retryButton}
            onPress={reload}
          >
            <Text style={styles.retryButtonText}>
              TRY AGAIN
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  if (review == null) {
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
  let gameTitle = 'Unknown Game';
  if (
    review.gameTitle != null &&
    review.gameTitle !== ''
  ) {
    gameTitle = review.gameTitle;
  }
  let genre = 'GAME';
  if (
    review.gameGenre != null &&
    review.gameGenre !== ''
  ) {
    genre = review.gameGenre.toUpperCase();
  }
  let coverUrl = null;
  if (
    review.gameCoverImageUrl != null &&
    review.gameCoverImageUrl !== ''
  ) {
    coverUrl = review.gameCoverImageUrl;
  }
  let displayName = 'GameWorth User';
  if (
    review.userDisplayName != null &&
    review.userDisplayName !== ''
  ) {
    displayName = review.userDisplayName;
  } else if (
    review.username != null &&
    review.username !== ''
  ) {
    displayName = review.username;
  }
  let avatarUrl = null;
  if (
    review.userAvatarUrl != null &&
    review.userAvatarUrl !== ''
  ) {
    avatarUrl = review.userAvatarUrl;
  }
  let comment = 'No comment written.';
  if (
    review.comment != null &&
    review.comment !== ''
  ) {
    comment = review.comment;
  }
  let reviewDate = review.updatedAt;
  if (
    reviewDate == null ||
    reviewDate === ''
  ) {
    reviewDate = review.createdAt;
  }

  const dateText = getReviewDate(reviewDate);
  const stars = getStars(Number(review.rating));

  let verdictText = 'WORTH IT';
  let verdictStyle = styles.worthBadge;
  let verdictTextStyle = styles.worthBadgeText;
  let verdictIcon = '✓';

  if (review.verdict === 'NOT_WORTH_IT') {
    verdictText = 'NOT WORTH IT';
    verdictStyle = styles.notWorthBadge;
    verdictTextStyle = styles.notWorthBadgeText;
    verdictIcon = '×';
  }

  let avatarContent;
  if (avatarUrl != null) {
    avatarContent = (
      <Image
        source={{uri: avatarUrl}}
        style={styles.avatar}
      />
    );
  } else {
    let letter = 'G';

    if (displayName !== '') {
      letter = displayName.charAt(0).toUpperCase();
    }

    avatarContent = (
      <View style={styles.avatarFallback}>
        <Text style={styles.avatarFallbackText}>
          {letter}
        </Text>
      </View>
    );
  }
  let currentUserId = null;

  if (authState.user != null) {
    if (authState.user.id != null) {
      currentUserId = Number(authState.user.id);
    } else if (authState.user.userId != null) {
      currentUserId = Number(authState.user.userId);
    }
  }
  let isOwner = false;
  if (
    authState.isLoggedIn &&
    currentUserId != null &&
    review.userId != null &&
    currentUserId === Number(review.userId)
  ) {
    isOwner = true;
  }
  let heroContent;
  if (coverUrl != null) {
    heroContent = (
      <ImageBackground
        source={{uri: coverUrl}}
        style={styles.hero}
        imageStyle={styles.heroImage}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <View style={styles.heroTitleArea}>
            <Text style={styles.genre}>
              {genre}
            </Text>
            <Text
              style={styles.gameTitle}
              numberOfLines={2}
            >
              {gameTitle}
            </Text>
          </View>
          <View style={verdictStyle}>
            <Text style={verdictTextStyle}>
              {verdictIcon} {verdictText}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  } else {
    heroContent = (
      <View style={styles.heroFallback}>
        <View style={styles.heroContent}>
          <View style={styles.heroTitleArea}>
            <Text style={styles.genre}>
              {genre}
            </Text>

            <Text style={styles.gameTitle}>
              {gameTitle}
            </Text>
          </View>

          <View style={verdictStyle}>
            <Text style={verdictTextStyle}>
              {verdictIcon} {verdictText}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  let platformContent = null;
  if (
    review.gamePlatform != null &&
    review.gamePlatform !== ''
  ) {
    platformContent = (
      <View style={styles.platformSection}>
        <Text style={styles.metadataLabel}>
          PLATFORM
        </Text>

        <Text style={styles.metadataValue}>
          {review.gamePlatform}
        </Text>
      </View>
    );
  }
  let ownerActions = null;
  if (isOwner) {
    ownerActions = (
      <View style={styles.actions}>
        <Pressable
          style={styles.editButton}
          onPress={openEditReview}
        >
          <Text style={styles.editIcon}>
            ✎
          </Text>

          <Text style={styles.editButtonText}>
            Edit Review
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={openDeleteReview}
        >
          <Text style={styles.deleteIcon}>
            X
          </Text>

          <Text style={styles.deleteButtonText}>
            Delete Review
          </Text>
        </Pressable>
      </View>
    );
  }
  return (
    <SafeAreaView
      style={styles.screen}
      edges={['bottom']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {heroContent}
        <View style={styles.body}>
          <View style={styles.reviewerCard}>
            <View style={styles.avatarArea}>
              {avatarContent}

              <View style={styles.ratingBadge}>
                <Text style={styles.ratingBadgeStar}>
                  ★
                </Text>

                <Text style={styles.ratingBadgeText}>
                  {Number(review.rating).toFixed(1)}
                </Text>
              </View>
            </View>

            <View style={styles.reviewerInformation}>
              <Text style={styles.reviewerName}>
                {displayName}
              </Text>

              <Text style={styles.reviewDate}>
                Reviewed on {dateText}
              </Text>
            </View>
          </View>


          <View style={styles.reviewCard}>
            <Text style={styles.reviewHeading}>
              Player Review
            </Text>

            <Text style={styles.comment}>
              {comment}
            </Text>

            <View style={styles.reviewMeta}>
              <View>
                <Text style={styles.metadataLabel}>
                  RATING
                </Text>

                <Text style={styles.stars}>
                  {stars}
                </Text>
              </View>

              {platformContent}
            </View>
          </View>


          {ownerActions}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#131314',
  },

  content: {
    paddingBottom: 36,
  },

  hero: {
    height: 350,
    justifyContent: 'flex-end',
    backgroundColor: '#201F20',
  },

  heroImage: {
    opacity: 0.72,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 19, 20, 0.38)',
  },

  heroFallback: {
    height: 260,
    justifyContent: 'flex-end',
    backgroundColor: '#201F20',
  },

  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  heroTitleArea: {
    flex: 1,
    paddingRight: 12,
  },

  genre: {
    marginBottom: 7,
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  gameTitle: {
    color: '#E5E2E3',
    fontSize: 39,
    lineHeight: 44,
    fontWeight: '900',
  },

  worthBadge: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(78, 222, 163, 0.40)',
    borderRadius: 24,
    backgroundColor: 'rgba(78, 222, 163, 0.10)',
  },

  worthBadgeText: {
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  notWorthBadge: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 180, 171, 0.40)',
    borderRadius: 24,
    backgroundColor: 'rgba(255, 180, 171, 0.08)',
  },

  notWorthBadgeText: {
    color: '#FFB4AB',
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  body: {
    paddingHorizontal: 20,
  },

  reviewerCard: {
    minHeight: 90,
    marginTop: -14,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#201F20',
  },

  avatarArea: {
    position: 'relative',
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2A2A2B',
  },

  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A393A',
  },

  avatarFallbackText: {
    color: '#E5E2E3',
    fontSize: 20,
    fontWeight: '800',
  },

  ratingBadge: {
    position: 'absolute',
    right: -8,
    bottom: -7,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#353436',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131314',
  },

  ratingBadgeStar: {
    color: '#FFB95F',
    fontSize: 10,
  },

  ratingBadgeText: {
    marginLeft: 3,
    color: '#FFB95F',
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
  },

  reviewerInformation: {
    flex: 1,
    marginLeft: 18,
  },

  reviewerName: {
    color: '#E5E2E3',
    fontSize: 19,
    fontWeight: '700',
  },

  reviewDate: {
    marginTop: 5,
    color: '#BBCABF',
    fontSize: 12,
  },

  reviewCard: {
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#1C1B1C',
  },

  reviewHeading: {
    color: '#E5E2E3',
    fontSize: 26,
    lineHeight: 33,
    fontWeight: '800',
  },

  comment: {
    marginTop: 18,
    color: '#BBCABF',
    fontSize: 16,
    lineHeight: 25,
  },

  reviewMeta: {
    marginTop: 26,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.07)',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  metadataLabel: {
    color: '#BBCABF',
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
  },

  metadataValue: {
    marginTop: 5,
    color: '#E5E2E3',
    fontSize: 15,
    fontWeight: '700',
  },

  stars: {
    marginTop: 5,
    color: '#FFB95F',
    fontSize: 18,
    letterSpacing: 1,
  },

  platformSection: {
    flex: 1,
    marginLeft: 32,
  },

  actions: {
    marginTop: 26,
  },

  editButton: {
    height: 58,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4EDEA3',
  },

  editIcon: {
    marginRight: 10,
    color: '#003824',
    fontSize: 20,
    fontWeight: '900',
  },

  editButtonText: {
    color: '#003824',
    fontSize: 18,
    fontWeight: '800',
  },

  deleteButton: {
    height: 52,
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteIcon: {
    marginRight: 8,
    color: '#FFB4AB',
    fontSize: 17,
  },

  deleteButtonText: {
    color: '#FFB4AB',
    fontSize: 16,
    fontWeight: '700',
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
    textAlign: 'center',
  },

  retryButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 20,
    backgroundColor: '#2A2A2B',
  },

  retryButtonText: {
    color: '#4EDEA3',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default ReviewDetailScreen;
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
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
  clearCommunitySummary,
  fetchCommunityRating,
  fetchGameReviews,
} from '../../features/reviews/reviewsSlice';


function ReviewListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const gamesState = useSelector(function (state) {
    return state.games;
  });

  const reviewsState = useSelector(function (state) {
    return state.reviews;
  });

  const allGameReviews = reviewsState.gameReviews;
  const summary = reviewsState.communitySummary;
  const loading = reviewsState.loading;
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


  const gameReviews = [];

  if (allGameReviews != null) {
    for (let i = 0; i < allGameReviews.length; i++) {
      const review = allGameReviews[i];

      if (Number(review.gameId) === gameId) {
        gameReviews.push(review);
      }
    }
  }


  React.useEffect(function () {
    if (isFocused && gameId != null) {
      dispatch(clearCommunitySummary());
      dispatch(fetchGameReviews(gameId));
      dispatch(fetchCommunityRating(gameId));
    }
  }, [dispatch, gameId, isFocused]);

  function openAddReview() {
    navigation.navigate('AddReview', {
      gameId: gameId,
      game: game,
    });
  }


  function openReviewDetail(reviewId) {
    navigation.navigate('ReviewDetail', {
      reviewId: reviewId,
    });
  }


  function reload() {
    if (gameId != null) {
      dispatch(fetchGameReviews(gameId));
      dispatch(fetchCommunityRating(gameId));
    }
  }


  function getReviewKey(item) {
    return item.id.toString();
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


  function getRelativeDate(value) {
    if (value == null || value === '') {
      return '';
    }

    const reviewDate = new Date(value);

    if (Number.isNaN(reviewDate.getTime())) {
      return '';
    }

    const now = new Date();
    const difference = now.getTime() - reviewDate.getTime();
    const days = Math.floor(difference / 86400000);

    if (days <= 0) {
      return 'Today';
    }

    if (days === 1) {
      return 'Yesterday';
    }

    if (days < 7) {
      return days + ' days ago';
    }

    if (days < 30) {
      const weeks = Math.floor(days / 7);

      if (weeks === 1) {
        return '1 week ago';
      }

      return weeks + ' weeks ago';
    }

    const months = Math.floor(days / 30);

    if (months === 1) {
      return '1 month ago';
    }

    return months + ' months ago';
  }


  function renderHeader() {
    let gameTitle = 'Game';

    if (
      game != null &&
      game.title != null &&
      game.title !== ''
    ) {
      gameTitle = game.title;
    }


    let coverUrl = null;

    if (
      game != null &&
      game.coverImageUrl != null &&
      game.coverImageUrl !== ''
    ) {
      coverUrl = game.coverImageUrl;
    }


    let averageRating = '0.0';
    let reviewCount = 0;

    if (summary != null) {
      if (summary.averageRating != null) {
        averageRating = Number(summary.averageRating).toFixed(1);
      }

      if (summary.reviewCount != null) {
        reviewCount = Number(summary.reviewCount);
      }
    }


    let heroContent;

    if (coverUrl != null) {
      heroContent = (
        <ImageBackground
          source={{ uri: coverUrl }}
          style={styles.hero}
          imageStyle={styles.heroImage}
          resizeMode="cover"
        >
          <View style={styles.heroDarkOverlay} />

          <View style={styles.heroBottomFade} />

          <View style={styles.heroContent}>
            <Text
              style={styles.gameTitle}
              numberOfLines={2}
            >
              {gameTitle}
            </Text>

            <View style={styles.summaryRow}>
              <View style={styles.summaryChip}>
                <Text style={styles.summaryStar}>
                  ★
                </Text>

                <Text style={styles.summaryValue}>
                  {averageRating}
                </Text>

                <Text style={styles.summaryLabel}>
                  Average
                </Text>
              </View>

              <View style={styles.summaryChip}>
                <Text style={styles.reviewIcon}>
                  ▣
                </Text>

                <Text style={styles.summaryValue}>
                  {reviewCount}
                </Text>

                <Text style={styles.summaryLabel}>
                  Reviews
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      );
    } else {
      heroContent = (
        <View style={styles.heroFallback}>
          <View style={styles.heroContent}>
            <Text
              style={styles.gameTitle}
              numberOfLines={2}
            >
              {gameTitle}
            </Text>

            <View style={styles.summaryRow}>
              <View style={styles.summaryChip}>
                <Text style={styles.summaryStar}>
                  ★
                </Text>

                <Text style={styles.summaryValue}>
                  {averageRating}
                </Text>

                <Text style={styles.summaryLabel}>
                  Average
                </Text>
              </View>

              <View style={styles.summaryChip}>
                <Text style={styles.reviewIcon}>
                  ▣
                </Text>

                <Text style={styles.summaryValue}>
                  {reviewCount}
                </Text>

                <Text style={styles.summaryLabel}>
                  Reviews
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }


    let writeButtonContent = null;

    if (gameReviews.length > 0) {
      writeButtonContent = (
        <Pressable
          style={styles.writeButton}
          onPress={openAddReview}
        >
          <Text style={styles.writeButtonPlus}>
            +
          </Text>

          <Text style={styles.writeButtonText}>
            Write Review
          </Text>
        </Pressable>
      );
    }


    return (
      <View>
        {heroContent}

        <View style={styles.sectionHeader}>
          <View style={styles.sectionInformation}>
            <Text style={styles.sectionTitle}>
              Player Reviews
            </Text>

            <Text style={styles.sectionSubtitle}>
              What the community thinks
            </Text>
          </View>

          {writeButtonContent}
        </View>
      </View>
    );
  }


  function renderReview(info) {
    const review = info.item;


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


    const dateText = getRelativeDate(reviewDate);
    const stars = getStars(Number(review.rating));


    let verdictText = 'WORTH IT';
    let verdictIcon = '✓';
    let verdictStyle = styles.worthBadge;
    let verdictTextStyle = styles.worthBadgeText;

    if (review.verdict === 'NOT_WORTH_IT') {
      verdictText = 'NOT WORTH IT';
      verdictIcon = '×';
      verdictStyle = styles.notWorthBadge;
      verdictTextStyle = styles.notWorthBadgeText;
    }


    let avatarContent;

    if (avatarUrl != null) {
      avatarContent = (
        <Image
          source={{ uri: avatarUrl }}
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


    function handlePress() {
      openReviewDetail(review.id);
    }


    return (
      <Pressable
        style={styles.reviewCard}
        onPress={handlePress}
      >
        <View style={styles.reviewTop}>
          <View style={styles.userSection}>
            {avatarContent}

            <View style={styles.userInformation}>
              <Text
                style={styles.userName}
                numberOfLines={1}
              >
                {displayName}
              </Text>

              <Text style={styles.reviewDate}>
                {dateText}
              </Text>
            </View>
          </View>

          <View style={styles.scoreSection}>
            <Text style={styles.stars}>
              {stars}
            </Text>

            <View style={verdictStyle}>
              <Text style={verdictTextStyle}>
                {verdictIcon} {verdictText}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.comment}>
          {comment}
        </Text>
      </Pressable>
    );
  }


  function renderEmpty() {
    if (loading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator
            size="large"
            color="#4EDEA3"
          />

          <Text style={styles.emptyTitle}>
            Loading reviews...
          </Text>
        </View>
      );
    }


    if (error != null) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.errorIcon}>
            !
          </Text>

          <Text style={styles.errorTitle}>
            Could not load reviews
          </Text>

          <Text style={styles.emptyDescription}>
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
      );
    }


    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>
          ☆
        </Text>

        <Text style={styles.emptyTitle}>
          No reviews yet
        </Text>

        <Text style={styles.emptyDescription}>
          Be the first player to review this game.
        </Text>

        <Pressable
          style={styles.firstReviewButton}
          onPress={openAddReview}
        >
          <Text style={styles.firstReviewButtonText}>
            Write the First Review
          </Text>
        </Pressable>
      </View>
    );
  }


  if (gameId == null) {
    return (
      <SafeAreaView
        style={styles.screen}
        edges={['bottom']}
      >
        <View style={styles.emptyState}>
          <Text style={styles.errorTitle}>
            Game not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['bottom']}
    >
      <FlatList
        data={gameReviews}
        keyExtractor={getReviewKey}
        renderItem={renderReview}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={reload}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#131314',
  },

  content: {
    paddingBottom: 40,
  },

  hero: {
    height: 270,
    justifyContent: 'flex-end',
    backgroundColor: '#201F20',
  },

  heroImage: {
    opacity: 0.82,
  },

  heroDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },

  heroBottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 125,
    backgroundColor: 'rgba(19, 19, 20, 0.55)',
  },

  heroFallback: {
    height: 220,
    justifyContent: 'flex-end',
    backgroundColor: '#201F20',
  },

  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 22,
  },

  gameTitle: {
    color: '#E5E2E3',
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '900',
  },

  summaryRow: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  summaryChip: {
    minHeight: 42,
    marginRight: 10,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(32, 31, 32, 0.92)',
  },

  summaryStar: {
    color: '#FFB95F',
    fontSize: 20,
  },

  reviewIcon: {
    color: '#ADC6FF',
    fontSize: 18,
  },

  summaryValue: {
    marginLeft: 7,
    color: '#E5E2E3',
    fontSize: 18,
    fontWeight: '800',
  },

  summaryLabel: {
    marginLeft: 8,
    color: '#BBCABF',
    fontSize: 12,
  },

  sectionHeader: {
    minHeight: 82,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionInformation: {
    flex: 1,
    paddingRight: 12,
  },

  sectionTitle: {
    color: '#E5E2E3',
    fontSize: 20,
    fontWeight: '800',
  },

  sectionSubtitle: {
    marginTop: 3,
    color: '#BBCABF',
    fontSize: 12,
  },

  writeButton: {
    minHeight: 42,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#0566D9',
  },

  writeButtonPlus: {
    marginRight: 5,
    color: '#E6ECFF',
    fontSize: 21,
    fontWeight: '600',
  },

  writeButtonText: {
    color: '#E6ECFF',
    fontSize: 13,
    fontWeight: '800',
  },

  reviewCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#201F20',
  },

  reviewTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  userSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3A393A',
  },

  avatarFallback: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A393A',
  },

  avatarFallbackText: {
    color: '#E5E2E3',
    fontSize: 17,
    fontWeight: '700',
  },

  userInformation: {
    flex: 1,
    marginLeft: 10,
  },

  userName: {
    color: '#E5E2E3',
    fontSize: 16,
    fontWeight: '700',
  },

  reviewDate: {
    marginTop: 2,
    color: '#BBCABF',
    fontSize: 11,
  },

  scoreSection: {
    marginLeft: 8,
    alignItems: 'flex-end',
  },

  stars: {
    color: '#FFB95F',
    fontSize: 16,
    letterSpacing: 1,
  },

  worthBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(78, 222, 163, 0.38)',
    borderRadius: 6,
    backgroundColor: 'rgba(78, 222, 163, 0.08)',
  },

  worthBadgeText: {
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  notWorthBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 180, 171, 0.38)',
    borderRadius: 6,
    backgroundColor: 'rgba(255, 180, 171, 0.07)',
  },

  notWorthBadgeText: {
    color: '#FFB4AB',
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  comment: {
    marginTop: 18,
    color: '#BBCABF',
    fontSize: 15,
    lineHeight: 22,
  },

  emptyState: {
    minHeight: 270,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyIcon: {
    color: '#4EDEA3',
    fontSize: 46,
  },

  emptyTitle: {
    marginTop: 12,
    color: '#E5E2E3',
    fontSize: 18,
    fontWeight: '800',
  },

  emptyDescription: {
    marginTop: 7,
    color: '#BBCABF',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },

  firstReviewButton: {
    minHeight: 46,
    marginTop: 20,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    backgroundColor: '#4EDEA3',
  },

  firstReviewButtonText: {
    color: '#003824',
    fontSize: 14,
    fontWeight: '800',
  },

  errorIcon: {
    color: '#FFB4AB',
    fontSize: 34,
    fontWeight: '900',
  },

  errorTitle: {
    marginTop: 10,
    color: '#FFB4AB',
    fontSize: 18,
    fontWeight: '700',
  },

  retryButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2A2A2B',
  },

  retryButtonText: {
    color: '#4EDEA3',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default ReviewListScreen;
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
  clearCommunitySummary,
  fetchCommunityRating,
  fetchGameReviews,
} from '../../features/reviews/reviewsSlice';


function CommunityRatingScreen() {
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

  const summary = reviewsState.communitySummary;
  const gameReviews = reviewsState.gameReviews;
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


  React.useEffect(function () {
    if (isFocused && gameId != null) {
      dispatch(clearCommunitySummary());
      dispatch(fetchCommunityRating(gameId));
      dispatch(fetchGameReviews(gameId));
    }
  }, [dispatch, gameId, isFocused]);


  function reload() {
    if (gameId != null) {
      dispatch(fetchCommunityRating(gameId));
      dispatch(fetchGameReviews(gameId));
    }
  }


  function openAllReviews() {
    navigation.navigate('ReviewList', {
      gameId: gameId,
      game: game,
    });
  }


  function openReviewDetail(reviewId) {
    navigation.navigate('ReviewDetail', {
      reviewId: reviewId,
    });
  }


  function getStars(rating) {
    let stars = '';
    const rounded = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
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


  function getBarWidth(count, total) {
    if (total <= 0) {
      return '0%';
    }

    const percentage = Math.round((count / total) * 100);

    return percentage + '%';
  }


  function renderDistributionRow(star, count, total) {
    const width = getBarWidth(count, total);

    return (
      <View style={styles.distributionRow}>
        <Text style={styles.distributionNumber}>
          {star}
        </Text>

        <Text style={styles.distributionStar}>
          ★
        </Text>

        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {
                width: width,
              },
            ]}
          />
        </View>

        <Text style={styles.distributionCount}>
          {count}
        </Text>
      </View>
    );
  }


  function renderRecentReview(review) {
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


    let verdictText = 'WORTH IT';
    let verdictStyle = styles.worthBadge;
    let verdictTextStyle = styles.worthBadgeText;

    if (review.verdict === 'NOT_WORTH_IT') {
      verdictText = 'NOT WORTH IT';
      verdictStyle = styles.notWorthBadge;
      verdictTextStyle = styles.notWorthBadgeText;
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


    function handlePress() {
      openReviewDetail(review.id);
    }


    return (
      <Pressable
        key={review.id}
        style={styles.recentReviewCard}
        onPress={handlePress}
      >
        <View style={styles.recentTop}>
          <View style={styles.reviewer}>
            {avatarContent}

            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>
                {displayName}
              </Text>

              <Text style={styles.reviewDate}>
                {getRelativeDate(reviewDate)}
              </Text>
            </View>
          </View>

          <View style={verdictStyle}>
            <Text style={verdictTextStyle}>
              {verdictText}
            </Text>
          </View>
        </View>

        <Text
          style={styles.reviewComment}
          numberOfLines={3}
        >
          {comment}
        </Text>

        <Text style={styles.reviewStars}>
          {getStars(Number(review.rating))}
        </Text>
      </Pressable>
    );
  }


  if (gameId == null) {
    return (
      <SafeAreaView
        style={styles.screen}
        edges={['bottom']}
      >
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>
            Game not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }


  if (loading && summary == null) {
    return (
      <SafeAreaView
        style={styles.screen}
        edges={['bottom']}
      >
        <View style={styles.centerState}>
          <ActivityIndicator
            size="large"
            color="#4EDEA3"
          />

          <Text style={styles.loadingText}>
            Loading community rating...
          </Text>
        </View>
      </SafeAreaView>
    );
  }


  if (error != null && summary == null) {
    return (
      <SafeAreaView
        style={styles.screen}
        edges={['bottom']}
      >
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>
            Could not load community rating
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


  let gameTitle = 'Game';

  if (
    game != null &&
    game.title != null &&
    game.title !== ''
  ) {
    gameTitle = game.title;
  }


  let gameDescription = 'See what the GameWorth community thinks about this game.';

  if (
    game != null &&
    game.description != null &&
    game.description !== ''
  ) {
    gameDescription = game.description;
  }


  let gameGenre = 'GAME';

  if (
    game != null &&
    game.genre != null &&
    game.genre !== ''
  ) {
    gameGenre = game.genre.toUpperCase();
  }


  let coverUrl = null;

  if (
    game != null &&
    game.coverImageUrl != null &&
    game.coverImageUrl !== ''
  ) {
    coverUrl = game.coverImageUrl;
  }


  let reviewCount = 0;
  let averageRating = 0;
  let worthItPercentage = 0;
  let fiveStarCount = 0;
  let fourStarCount = 0;
  let threeStarCount = 0;
  let twoStarCount = 0;
  let oneStarCount = 0;


  if (summary != null) {
    reviewCount = Number(summary.reviewCount);
    averageRating = Number(summary.averageRating);
    worthItPercentage = Number(summary.worthItPercentage);

    fiveStarCount = Number(summary.fiveStarCount);
    fourStarCount = Number(summary.fourStarCount);
    threeStarCount = Number(summary.threeStarCount);
    twoStarCount = Number(summary.twoStarCount);
    oneStarCount = Number(summary.oneStarCount);
  }


  const averageRatingText = averageRating.toFixed(1);
  const averageStars = getStars(averageRating);


  const recentReviews = [];

  if (gameReviews != null) {
    for (let i = 0; i < gameReviews.length; i++) {
      if (Number(gameReviews[i].gameId) === gameId) {
        recentReviews.push(gameReviews[i]);
      }

      if (recentReviews.length === 2) {
        break;
      }
    }
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
          <View style={styles.genreBadge}>
            <Text style={styles.genreText}>
              {gameGenre}
            </Text>
          </View>

          <Text style={styles.gameTitle}>
            {gameTitle}
          </Text>

          <Text
            style={styles.gameDescription}
            numberOfLines={3}
          >
            {gameDescription}
          </Text>
        </View>
      </ImageBackground>
    );
  } else {
    heroContent = (
      <View style={styles.heroFallback}>
        <View style={styles.heroContent}>
          <View style={styles.genreBadge}>
            <Text style={styles.genreText}>
              {gameGenre}
            </Text>
          </View>

          <Text style={styles.gameTitle}>
            {gameTitle}
          </Text>

          <Text style={styles.gameDescription}>
            {gameDescription}
          </Text>
        </View>
      </View>
    );
  }


  let recentReviewsContent;

  if (recentReviews.length === 0) {
    recentReviewsContent = (
      <View style={styles.noRecentReviews}>
        <Text style={styles.noRecentReviewsText}>
          No community reviews yet.
        </Text>
      </View>
    );
  } else {
    const cards = [];

    for (let i = 0; i < recentReviews.length; i++) {
      cards.push(renderRecentReview(recentReviews[i]));
    }

    recentReviewsContent = cards;
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
          <View style={styles.verdictCard}>
            <View style={styles.verdictTop}>
              <View style={styles.verdictTitleArea}>
                <Text style={styles.cardTitle}>
                  Community Verdict
                </Text>

                <Text style={styles.cardSubtitle}>
                  Based on {reviewCount} community reviews
                </Text>
              </View>

              <View style={styles.worthSection}>
                <View style={styles.worthPercentage}>
                  <Text style={styles.worthSeal}>
                    ✓
                  </Text>

                  <Text style={styles.worthPercentageText}>
                    {worthItPercentage}%
                  </Text>
                </View>

                <Text style={styles.worthLabel}>
                  WORTH IT
                </Text>
              </View>
            </View>


            <View style={styles.divider} />


            <View style={styles.ratingSummary}>
              <View>
                <Text style={styles.averageRating}>
                  {averageRatingText}
                </Text>

                <Text style={styles.averageStars}>
                  {averageStars}
                </Text>
              </View>


              <View style={styles.scoreCircle}>
                <Text style={styles.scoreNumber}>
                  {worthItPercentage}
                </Text>

                <Text style={styles.scoreLabel}>
                  SCORE
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.distributionCard}>
            <Text style={styles.cardTitle}>
              Rating Distribution
            </Text>

            <View style={styles.distributionList}>
              {renderDistributionRow(5, fiveStarCount, reviewCount)}
              {renderDistributionRow(4, fourStarCount, reviewCount)}
              {renderDistributionRow(3, threeStarCount, reviewCount)}
              {renderDistributionRow(2, twoStarCount, reviewCount)}
              {renderDistributionRow(1, oneStarCount, reviewCount)}
            </View>
          </View>


          <Text style={styles.recentTitle}>
            Recent Reviews
          </Text>

          {recentReviewsContent}


          <Pressable
            style={styles.viewAllButton}
            onPress={openAllReviews}
          >
            <Text style={styles.viewAllButtonText}>
              View All {reviewCount} Reviews
            </Text>

            <Text style={styles.arrow}>
              →
            </Text>
          </Pressable>
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
    paddingBottom: 40,
  },

  hero: {
    height: 360,
    justifyContent: 'flex-end',
    backgroundColor: '#201F20',
  },

  heroImage: {
    opacity: 0.74,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 19, 20, 0.45)',
  },

  heroFallback: {
    height: 280,
    justifyContent: 'flex-end',
    backgroundColor: '#201F20',
  },

  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 42,
  },

  genreBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(32, 31, 32, 0.85)',
  },

  genreText: {
    color: '#FFB95F',
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  gameTitle: {
    marginTop: 12,
    color: '#E5E2E3',
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '900',
  },

  gameDescription: {
    marginTop: 7,
    maxWidth: 330,
    color: '#BBCABF',
    fontSize: 15,
    lineHeight: 22,
  },

  body: {
    marginTop: -24,
    paddingHorizontal: 20,
  },

  verdictCard: {
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#201F20',
  },

  verdictTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  verdictTitleArea: {
    flex: 1,
    paddingRight: 12,
  },

  cardTitle: {
    color: '#E5E2E3',
    fontSize: 19,
    fontWeight: '700',
  },

  cardSubtitle: {
    marginTop: 5,
    color: '#BBCABF',
    fontSize: 13,
    lineHeight: 19,
  },

  worthSection: {
    alignItems: 'flex-end',
  },

  worthPercentage: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78, 222, 163, 0.12)',
  },

  worthSeal: {
    color: '#4EDEA3',
    fontSize: 16,
    fontWeight: '900',
  },

  worthPercentageText: {
    marginLeft: 7,
    color: '#4EDEA3',
    fontSize: 22,
  },

  worthLabel: {
    marginTop: 6,
    color: '#BBCABF',
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    marginVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },

  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  averageRating: {
    color: '#E5E2E3',
    fontSize: 36,
    fontWeight: '800',
  },

  averageStars: {
    marginTop: 6,
    color: '#FFB95F',
    fontSize: 17,
    letterSpacing: 1,
  },

  scoreCircle: {
    width: 92,
    height: 92,
    borderWidth: 10,
    borderColor: '#4EDEA3',
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreNumber: {
    color: '#E5E2E3',
    fontSize: 21,
    fontWeight: '700',
  },

  scoreLabel: {
    marginTop: 2,
    color: '#BBCABF',
    fontFamily: 'monospace',
    fontSize: 8,
    fontWeight: '700',
  },

  distributionCard: {
    marginTop: 24,
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#201F20',
  },

  distributionList: {
    marginTop: 22,
  },

  distributionRow: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
  },

  distributionNumber: {
    width: 18,
    color: '#E5E2E3',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'right',
  },

  distributionStar: {
    width: 30,
    marginLeft: 7,
    color: '#FFB95F',
    fontSize: 13,
    textAlign: 'center',
  },

  barBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#353436',
  },

  barFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFB95F',
  },

  distributionCount: {
    width: 42,
    marginLeft: 10,
    color: '#BBCABF',
    fontSize: 14,
    textAlign: 'right',
  },

  recentTitle: {
    marginTop: 28,
    marginBottom: 14,
    color: '#E5E2E3',
    fontSize: 19,
    fontWeight: '700',
  },

  recentReviewCard: {
    marginBottom: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#201F20',
  },

  recentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  reviewer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
    fontSize: 16,
    fontWeight: '700',
  },

  reviewerInfo: {
    flex: 1,
    marginLeft: 10,
  },

  reviewerName: {
    color: '#E5E2E3',
    fontSize: 15,
    fontWeight: '700',
  },

  reviewDate: {
    marginTop: 2,
    color: '#BBCABF',
    fontSize: 11,
  },

  worthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'rgba(78, 222, 163, 0.10)',
  },

  worthBadgeText: {
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
  },

  notWorthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 180, 171, 0.08)',
  },

  notWorthBadgeText: {
    color: '#FFB4AB',
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
  },

  reviewComment: {
    marginTop: 14,
    color: '#E5E2E3',
    fontSize: 14,
    lineHeight: 21,
  },

  reviewStars: {
    marginTop: 10,
    color: '#FFB95F',
    fontSize: 14,
    letterSpacing: 1,
  },

  noRecentReviews: {
    minHeight: 110,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201F20',
  },

  noRecentReviewsText: {
    color: '#BBCABF',
    fontSize: 14,
  },

  viewAllButton: {
    height: 56,
    marginTop: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0566D9',
  },

  viewAllButtonText: {
    color: '#E6ECFF',
    fontSize: 16,
    fontWeight: '600',
  },

  arrow: {
    marginLeft: 10,
    color: '#E6ECFF',
    fontSize: 23,
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
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  errorDescription: {
    marginTop: 8,
    color: '#BBCABF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  retryButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 22,
    backgroundColor: '#2A2A2B',
  },

  retryButtonText: {
    color: '#4EDEA3',
    fontSize: 12,
    fontWeight: '800',
  },
});
export default CommunityRatingScreen;
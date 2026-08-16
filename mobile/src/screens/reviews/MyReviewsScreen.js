import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyReviews } from '../../features/reviews/reviewsSlice';

function MyReviewsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authState = useSelector(function (state) {
    return state.auth;
  });

  const reviewsState = useSelector(function (state) {
    return state.reviews;
  });

  const user = authState.user;
  const isLoggedIn = authState.isLoggedIn;
  const myReviews = reviewsState.myReviews;
  const loading = reviewsState.loading;
  const error = reviewsState.error;

  React.useEffect(function () {
    if (isFocused && isLoggedIn) {
      dispatch(fetchMyReviews());
    }
  }, [dispatch, isFocused, isLoggedIn]);
  function loadReviews() {
    if (isLoggedIn) {
      dispatch(fetchMyReviews());
    }
  }
  function openLogin() {
    navigation.navigate('Login');
  }
  function openGames() {
    navigation.navigate('Games');
  }
  function openProfile() {
    navigation.navigate('Profile');
  }
  function openReviewDetail(reviewId) {
    navigation.navigate('ReviewDetail', {
      reviewId: reviewId,
    });
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
  function getAverageRating() {
    if (myReviews.length === 0) {
      return '0.0';
    }
    let total = 0;
    for (let i = 0; i < myReviews.length; i++) {
      total += Number(myReviews[i].rating);
    }
    const average = total / myReviews.length;

    return average.toFixed(1);
  }

  function getFiveStarCount() {
    let count = 0;
    for (let i = 0; i < myReviews.length; i++) {
      if (Number(myReviews[i].rating) === 5) {
        count++;
      }
    }
    return count;
  }
  function getAvatarContent() {
    let avatarUrl = null;
    if (user != null && user.avatarUrl != null && user.avatarUrl !== '') {
      avatarUrl = user.avatarUrl;
    }

    if (avatarUrl != null) {
      return (
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatarImage}
        />
      );
    }

    let letter = 'G';

    if (user != null && user.displayName != null && user.displayName !== '') {
      letter = user.displayName.charAt(0).toUpperCase();
    }

    return (
      <View style={styles.avatarFallback}>
        <Text style={styles.avatarFallbackText}>
          {letter}
        </Text>
      </View>
    );
  }


  function renderHeader() {
    const averageRating = getAverageRating();
    const fiveStarCount = getFiveStarCount();
    return (
      <View>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>
            My Reviews
          </Text>

          <Text style={styles.pageSubtitle}>
            Your ratings and opinions
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.reviewIcon}>
              ▰
            </Text>

            <Text style={styles.statValue}>
              {myReviews.length}
            </Text>

            <Text style={styles.statLabel}>
              TOTAL{'\n'}REVIEWS
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.ratingIcon}>
              ★
            </Text>

            <Text style={styles.statValue}>
              {averageRating}
            </Text>

            <Text style={styles.statLabel}>
              AVERAGE{'\n'}RATING
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.worthIcon}>
              ✦
            </Text>
            <Text style={styles.statValue}>
              {fiveStarCount}
            </Text>

            <Text style={styles.statLabel}>
              5 STAR{'\n'}REVIEWS
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Your Reviews
        </Text>
      </View>
    );
  }
  function renderReview(info) {
    const review = info.item;
    let title = 'Unknown Game';
    if (review.gameTitle != null && review.gameTitle !== '') {
      title = review.gameTitle;
    }

    let comment = 'No comment written.';
    if (review.comment != null && review.comment !== '') {
      comment = review.comment;
    }

    let coverUrl = null;
    if (
      review.gameCoverImageUrl != null &&
      review.gameCoverImageUrl !== ''
    ) {
      coverUrl = review.gameCoverImageUrl;
    }

    let reviewDate = review.updatedAt;
    if (reviewDate == null || reviewDate === '') {
      reviewDate = review.createdAt;
    }

    const dateText = getRelativeDate(reviewDate);
    const starText = getStars(Number(review.rating));

    let verdictText = 'WORTH IT';
    let badgeStyle = styles.worthBadge;
    let badgeTextStyle = styles.worthBadgeText;

    if (review.verdict === 'NOT_WORTH_IT') {
      verdictText = 'NOT WORTH IT';
      badgeStyle = styles.notWorthBadge;
      badgeTextStyle = styles.notWorthBadgeText;
    }
    function handlePress() {
      openReviewDetail(review.id);
    }
    let coverContent;
    if (coverUrl != null) {
      coverContent = (
        <Image
          source={{ uri: coverUrl }}
          style={styles.gameCover}
          resizeMode="cover"
        />
      );
    } else {
      coverContent = (
        <View style={styles.gameCoverFallback}>
          <Text style={styles.gameCoverFallbackText}>
            GW
          </Text>
        </View>
      );
    }
    return (
      <Pressable
        style={styles.reviewCard}
        onPress={handlePress}
      >
        <View style={styles.reviewMainRow}>
          {coverContent}

          <View style={styles.reviewInformation}>
            <View style={styles.reviewTitleRow}>
              <Text
                style={styles.gameTitle}
                numberOfLines={1}
              >
                {title}
              </Text>

              <View style={badgeStyle}>
                <Text style={styles.badgeIcon}>
                  ✦
                </Text>

                <Text style={badgeTextStyle}>
                  {verdictText}
                </Text>
              </View>
            </View>

            <View style={styles.ratingRow}>
              <Text style={styles.stars}>
                {starText}
              </Text>

              <Text style={styles.reviewDate}>
                {dateText}
              </Text>
            </View>

            <Text
              style={styles.reviewComment}
              numberOfLines={2}
            >
              {comment}
            </Text>
          </View>
        </View>
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
            Loading your reviews...
          </Text>
        </View>
      );
    }

    if (error != null) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.errorTitle}>
            Could not load reviews
          </Text>

          <Text style={styles.emptyDescription}>
            {error}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={loadReviews}
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
          Review a game and it will appear here.
        </Text>
      </View>
    );
  }
  function renderFooter() {
    return (
      <View style={styles.footer}>
        <Pressable
          style={styles.browseButton}
          onPress={openGames}
        >
          <Text style={styles.browseIcon}>
            ◉
          </Text>

          <Text style={styles.browseButtonText}>
            Browse All Games
          </Text>
        </Pressable>
      </View>
    );
  }
  if (!isLoggedIn) {
    return (
      <SafeAreaView
        style={styles.screen}
        edges={['top']}
      >
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>
                GW
              </Text>
            </View>

            <Text style={styles.topBarTitle}>
              My Reviews
            </Text>
          </View>
        </View>

        <View style={styles.loginState}>
          <Text style={styles.emptyIcon}>
            ☆
          </Text>

          <Text style={styles.loginTitle}>
            Your reviews live here
          </Text>

          <Text style={styles.loginDescription}>
            Log in to rate games and keep track of your reviews.
          </Text>

          <Pressable
            style={styles.browseButton}
            onPress={openLogin}
          >
            <Text style={styles.browseButtonText}>
              Log In
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top']}
    >
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>
              GW
            </Text>
          </View>

          <Text style={styles.topBarTitle}>
            My Reviews
          </Text>
        </View>

        <Pressable onPress={openProfile}>
          {getAvatarContent()}
        </Pressable>
      </View>

      <FlatList
        data={myReviews}
        keyExtractor={getReviewKey}
        renderItem={renderReview}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={loadReviews}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#131314',
  },

  topBar: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 54,
    height: 34,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E1717',
  },

  logoText: {
    color: '#4EDEA3',
    fontSize: 11,
    fontWeight: '900',
  },

  topBarTitle: {
    marginLeft: 12,
    color: '#E5E2E3',
    fontSize: 25,
    fontWeight: '800',
  },

  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  avatarFallback: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2B',
  },

  avatarFallbackText: {
    color: '#4EDEA3',
    fontSize: 15,
    fontWeight: '900',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  titleSection: {
    marginTop: 24,
  },

  pageTitle: {
    color: '#E5E2E3',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '800',
  },

  pageSubtitle: {
    marginTop: 4,
    color: '#BBCABF',
    fontSize: 16,
    lineHeight: 24,
  },

  statsRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '31.5%',
    minHeight: 124,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201F20',
  },

  reviewIcon: {
    color: '#4EDEA3',
    fontSize: 24,
    fontWeight: '900',
  },

  ratingIcon: {
    color: '#FFB95F',
    fontSize: 28,
  },

  worthIcon: {
    color: '#4EDEA3',
    fontSize: 27,
  },

  statValue: {
    marginTop: 6,
    color: '#E5E2E3',
    fontSize: 29,
    fontWeight: '400',
  },

  statLabel: {
    marginTop: 8,
    color: '#BBCABF',
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  sectionTitle: {
    marginTop: 32,
    marginBottom: 16,
    color: '#E5E2E3',
    fontSize: 21,
    fontWeight: '800',
  },

  reviewCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#201F20',
  },

  reviewMainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  gameCover: {
    width: 72,
    height: 96,
    borderRadius: 10,
    backgroundColor: '#2A2A2B',
  },

  gameCoverFallback: {
    width: 72,
    height: 96,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2B',
  },

  gameCoverFallbackText: {
    color: '#4EDEA3',
    fontSize: 16,
    fontWeight: '900',
  },

  reviewInformation: {
    flex: 1,
    marginLeft: 16,
  },

  reviewTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  gameTitle: {
    flex: 1,
    paddingRight: 8,
    color: '#E5E2E3',
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
  },

  worthBadge: {
    minHeight: 29,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(78, 222, 163, 0.35)',
    borderRadius: 999,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },

  worthBadgeText: {
    marginLeft: 4,
    color: '#4EDEA3',
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
  },

  notWorthBadge: {
    minHeight: 29,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 180, 171, 0.35)',
    borderRadius: 999,
    backgroundColor: 'rgba(147, 0, 10, 0.18)',
  },

  notWorthBadgeText: {
    marginLeft: 4,
    color: '#FFB4AB',
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
  },

  badgeIcon: {
    color: '#4EDEA3',
    fontSize: 12,
  },

  ratingRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  stars: {
    color: '#FFB95F',
    fontSize: 17,
    letterSpacing: 1,
  },

  reviewDate: {
    marginLeft: 12,
    color: '#BBCABF',
    fontSize: 12,
  },

  reviewComment: {
    marginTop: 9,
    color: '#BBCABF',
    fontSize: 14,
    lineHeight: 20,
  },

  footer: {
    paddingTop: 24,
    paddingBottom: 8,
    alignItems: 'center',
  },

  browseButton: {
    width: '88%',
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0566D9',
  },

  browseIcon: {
    marginRight: 9,
    color: '#E6ECFF',
    fontSize: 19,
  },

  browseButtonText: {
    color: '#E6ECFF',
    fontSize: 16,
    fontWeight: '600',
  },

  emptyState: {
    minHeight: 230,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyIcon: {
    color: '#4EDEA3',
    fontSize: 42,
  },

  emptyTitle: {
    marginTop: 13,
    color: '#E5E2E3',
    fontSize: 18,
    fontWeight: '700',
  },

  emptyDescription: {
    marginTop: 8,
    color: '#BBCABF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  errorTitle: {
    color: '#FFB4AB',
    fontSize: 18,
    fontWeight: '700',
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
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
  },

  loginState: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginTitle: {
    marginTop: 18,
    color: '#E5E2E3',
    fontSize: 24,
    fontWeight: '800',
  },
  loginDescription: {
    maxWidth: 300,
    marginTop: 10,
    marginBottom: 10,
    color: '#BBCABF',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
export default MyReviewsScreen;
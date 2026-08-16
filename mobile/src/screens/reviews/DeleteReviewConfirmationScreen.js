import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {
  clearReviewsError,
  removeReview,
} from '../../features/reviews/reviewsSlice';


function DeleteReviewConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const reviewsState = useSelector(function (state) {
    return state.reviews;
  });

  const selectedReview = reviewsState.selectedReview;
  const deleting = reviewsState.deleting;
  const error = reviewsState.error;


  let reviewId = null;

  if (
    route.params != null &&
    route.params.reviewId != null
  ) {
    reviewId = Number(route.params.reviewId);
  }


  let gameTitle = 'this game';

  if (
    route.params != null &&
    route.params.gameTitle != null &&
    route.params.gameTitle !== ''
  ) {
    gameTitle = route.params.gameTitle;
  } else if (
    selectedReview != null &&
    selectedReview.gameTitle != null &&
    selectedReview.gameTitle !== ''
  ) {
    gameTitle = selectedReview.gameTitle;
  }


  React.useEffect(function () {
    dispatch(clearReviewsError());
  }, [dispatch]);


  function cancelDelete() {
    navigation.goBack();
  }


  async function confirmDelete() {
    if (reviewId == null) {
      return;
    }

    dispatch(clearReviewsError());

    const result = await dispatch(removeReview(reviewId));

    if (removeReview.fulfilled.match(result)) {
      navigation.pop(2);
    }
  }


  let deleteButtonContent;

  if (deleting) {
    deleteButtonContent = (
      <ActivityIndicator
        size="small"
        color="#FFDAD6"
      />
    );
  } else {
    deleteButtonContent = (
      <View style={styles.deleteButtonContent}>
        <Text style={styles.deleteIcon}>
          ×
        </Text>

        <Text style={styles.deleteButtonText}>
          Delete Review
        </Text>
      </View>
    );
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


  if (reviewId == null) {
    return (
      <SafeAreaView
        style={styles.screen}
        edges={['bottom']}
      >
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>
            Review not found
          </Text>

          <Pressable
            style={styles.cancelSmallButton}
            onPress={cancelDelete}
          >
            <Text style={styles.cancelSmallButtonText}>
              GO BACK
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView
      style={styles.screen}
      edges={['bottom']}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.warningCircle}>
            <Text style={styles.warningIcon}>
              !
            </Text>
          </View>


          <Text style={styles.title}>
            Delete Review?
          </Text>


          <Text style={styles.description}>
            You are about to delete your review for{' '}
            <Text style={styles.gameTitle}>
              {gameTitle}
            </Text>
            . This action cannot be undone and will remove it from your profile permanently.
          </Text>


          {errorContent}


          <Pressable
            style={styles.deleteButton}
            onPress={confirmDelete}
            disabled={deleting}
          >
            {deleteButtonContent}
          </Pressable>


          <Pressable
            style={styles.cancelButton}
            onPress={cancelDelete}
            disabled={deleting}
          >
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#131314',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 36,
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 380,
    paddingHorizontal: 24,
    paddingVertical: 36,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: '#201F20',
  },

  warningCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(147, 0, 10, 0.26)',
  },

  warningIcon: {
    color: '#FFB4AB',
    fontSize: 35,
    fontWeight: '900',
  },

  title: {
    marginTop: 28,
    color: '#E5E2E3',
    fontSize: 27,
    fontWeight: '800',
    textAlign: 'center',
  },

  description: {
    marginTop: 16,
    color: '#BBCABF',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },

  gameTitle: {
    color: '#E5E2E3',
    fontWeight: '800',
  },

  errorBox: {
    width: '100%',
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(147, 0, 10, 0.18)',
  },

  errorText: {
    color: '#FFB4AB',
    fontSize: 13,
    textAlign: 'center',
  },

  deleteButton: {
    width: '100%',
    height: 58,
    marginTop: 30,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#93000A',
  },

  deleteButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deleteIcon: {
    marginRight: 10,
    color: '#FFDAD6',
    fontSize: 26,
    fontWeight: '700',
  },

  deleteButtonText: {
    color: '#FFDAD6',
    fontSize: 18,
    fontWeight: '800',
  },

  cancelButton: {
    height: 54,
    marginTop: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    color: '#BBCABF',
    fontSize: 17,
    fontWeight: '700',
  },

  centerState: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorTitle: {
    color: '#FFB4AB',
    fontSize: 19,
    fontWeight: '700',
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
export default DeleteReviewConfirmationScreen;
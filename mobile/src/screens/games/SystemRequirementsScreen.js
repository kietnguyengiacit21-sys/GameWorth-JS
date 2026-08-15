import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import LoadingState from '../../components/LoadingState';
import {
  fetchGameDetail,
} from '../../features/games/gamesSlice';
import { colors } from '../../theme/colors';

function SystemRequirementsScreen(props) {
  const route = props.route;
  const gameId = route.params.gameId;
  const dispatch = useDispatch();
  const gamesState = useSelector(
    function (state) {
      return state.games;
    }
  );
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

  const cachedGame = findGameById();
  let game = null;
  if (selectedGame != null && selectedGame.id === gameId) {
    game = selectedGame;
  } else if (cachedGame != null) {
    game = cachedGame;
  }
  React.useEffect(
    function () {
      if (selectedGame == null || selectedGame.id !== gameId) {
        dispatch(fetchGameDetail(gameId));
      }
    }, [gameId]
  );


  if (detailLoading && game == null) {
    return (
      <LoadingState
        message="Loading requirements..."
      />
    );
  }
  if (game == null) {
    let errorMessage =
      'Game requirements were not found.';
    if (error) {
      errorMessage = error;
    }
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Cannot load requirements
        </Text>
        <Text style={styles.errorText}>
          {errorMessage}
        </Text>

      </View>
    );
  }

  function splitRequirements(text) {
    const result = {
      os: 'Not available',
      processor: 'Not available',
      memory: 'Not available',
      graphics: 'Not available',
      storage: 'Not available',
    };
    if (text == null || text.trim() === '') {
      return result;
    }
    const parts = text.split(',');
    if (parts.length > 0) {
      result.os = parts[0].trim();
    }
    if (parts.length > 1) {
      result.processor = parts[1].trim();
    }
    if (parts.length > 2) {
      result.memory = parts[2].trim();
    }
    if (parts.length > 3) {
      result.graphics = parts[3].trim();
    }
    if (parts.length > 4) {
      result.storage = parts[4].trim();
    }
    return result;
  }
  const minimum = splitRequirements(game.minimumRequirements);
  const recommended = splitRequirements(game.recommendedRequirements);

  let headerContent;
  if (game.coverImageUrl) {
    const imageSource = { uri: game.coverImageUrl };
    headerContent = (
      <ImageBackground
        source={imageSource}
        style={styles.hero}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.gameTitle}>
            {game.title}
          </Text>
        </View>
      </ImageBackground>
    );
  } else {
    headerContent = (
      <View style={styles.heroFallback}>
        <Text style={styles.gameTitle}>
          {game.title}
        </Text>
      </View>
    );
  }
  function RequirementRow(rowProps) {
    const label = rowProps.label;
    const value = rowProps.value;
    return (
      <View style={styles.requirementRow}>
        <Text style={styles.requirementLabel}>
          {label}
        </Text>
        <Text style={styles.requirementValue}>
          {value}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      {headerContent}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Minimum
        </Text>
        <View style={styles.line} />
        <RequirementRow
          label="OS"
          value={minimum.os}
        />
        <RequirementRow
          label="PROCESSOR"
          value={minimum.processor}
        />
        <RequirementRow
          label="MEMORY"
          value={minimum.memory}
        />
        <RequirementRow
          label="GRAPHICS"
          value={minimum.graphics}
        />
        <RequirementRow
          label="STORAGE"
          value={minimum.storage}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Recommended
        </Text>
        <View style={styles.line} />
        <RequirementRow
          label="OS"
          value={recommended.os}
        />
        <RequirementRow
          label="PROCESSOR"
          value={recommended.processor}
        />
        <RequirementRow
          label="MEMORY"
          value={recommended.memory}
        />
        <RequirementRow
          label="GRAPHICS"
          value={recommended.graphics}
        />
        <RequirementRow
          label="STORAGE"
          value={recommended.storage}
        />
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
    paddingBottom: 40,
  },
  hero: {
    height: 220,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor:
      'rgba(0, 0, 0, 0.55)',
  },
  heroFallback: {
    height: 180,
    justifyContent: 'flex-end',
    padding: 20,

    backgroundColor:
      colors.surfaceHigh,
  },
  gameTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#1C1B1C',
  },
  cardTitle: {
    color: '#4EDEA3',
    fontSize: 22,
    fontWeight: '900',
  },
  line: {
    height: 1,
    marginTop: 12,
    marginBottom: 16,
    backgroundColor:
      '#353436',
  },
  requirementRow: {
    marginBottom: 17,
  },
  requirementLabel: {
    color: '#BBCABF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  requirementValue: {
    marginTop: 6,
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor:
      colors.background,
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
export default SystemRequirementsScreen;
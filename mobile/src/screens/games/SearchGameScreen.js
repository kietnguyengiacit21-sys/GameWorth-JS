import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../theme/colors';

function SearchGameScreen(props) {
  const navigation = props.navigation;
  const gamesState = useSelector(function (state) {
    return state.games;
  });

  const items = gamesState.items;
  const searchState = React.useState('');
  const searchText = searchState[0];
  const setSearchText = searchState[1];
  function handleSearchTextChange(text) {
    setSearchText(text);
  }

  function gameMatchesSearch(game) {
    if (searchText.trim() === '') {
      return true;
    }
    const keyword = searchText.toLowerCase().trim();
    let title = '';
    if (game.title) {
      title = game.title.toLowerCase();
    }
    let genre = '';
    if (game.genre) {
      genre = game.genre.toLowerCase();
    }
    let platform = '';
    if (game.platform) {
      platform = game.platform.toLowerCase();
    }
    if (title.includes(keyword)) {
      return true;
    }
    if (genre.includes(keyword)) {
      return true;
    }
    if (platform.includes(keyword)) {
      return true;
    }
    return false;
  }

  const filteredGames = items.filter(gameMatchesSearch);
  function openGameDetail(gameId) {
    navigation.navigate('GameDetail', {
      gameId: gameId,
    });
  }

  function getGameKey(item) {
    return item.id.toString();
  }

  function renderGame(info) {
    const game = info.item;
    let priceText = 'Free';
    const priceNumber = Number(game.price);
    if (priceNumber !== 0) {
      priceText = '$' + priceNumber.toFixed(2);
    }
    let genreText = 'Unknown genre';
    if (game.genre) {
      genreText = game.genre;
    }
    let platformText = 'Unknown platform';
    if (game.platform) {
      platformText = game.platform;
    }
    let imageContent;
    if (game.coverImageUrl) {
      const imageSource = {
        uri: game.coverImageUrl,
      };
      imageContent = (
        <Image source={imageSource} style={styles.cover} />
      );
    } else {
      let firstLetter = '';
      if (game.title) {
        firstLetter = game.title.charAt(0).toUpperCase();
      }
      imageContent = (
        <View style={styles.coverFallback}>
          <Text style={styles.coverLetter}>{firstLetter}</Text>
        </View>
      );
    }
    function handleGamePress() {
      openGameDetail(game.id);
    }
    return (
      <Pressable onPress={handleGamePress} style={styles.card}>
        {imageContent}
        <View style={styles.gameInfo}>
          <Text numberOfLines={1} style={styles.gameTitle}>
            {game.title}
          </Text>
          <Text numberOfLines={1} style={styles.genre}>
            {genreText}
          </Text>
          <Text numberOfLines={2} style={styles.platform}>
            {platformText}
          </Text>
          <Text style={styles.price}>{priceText}</Text>
        </View>
      </Pressable>
    );
  }

  let resultTitle = 'All Games';
  if (searchText.trim() !== '') {
    resultTitle = 'Search Results';
  }

  let emptyMessage = 'No games available.';
  if (searchText.trim() !== '') {
    emptyMessage = 'No games found for "' + searchText + '".';
  }

  const emptyComponent = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{emptyMessage}</Text>
    </View>
  );

  const listHeader = (
    <View>
      <Text style={styles.screenTitle}>Search</Text>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={searchText}
          onChangeText={handleSearchTextChange}
          placeholder="Search titles, genres, or platforms..."
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
        />
      </View>
      <Text style={styles.resultTitle}>{resultTitle}</Text>
      <Text style={styles.resultCount}>{filteredGames.length} games found</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredGames}
        keyExtractor={getGameKey}
        renderItem={renderGame}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={emptyComponent}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    paddingBottom: 40,
  },
  screenTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 26,
  },
  searchBox: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#2A2A2B',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  resultTitle: {
    marginTop: 28,
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  resultCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.textMuted,
    fontSize: 13,
  },
  card: {
    minHeight: 145,
    flexDirection: 'row',
    marginBottom: 14,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#201F20',
  },
  cover: {
    width: 100,
    height: 130,
    borderRadius: 12,
  },
  coverFallback: {
    width: 100,
    height: 130,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
  },
  coverLetter: {
    color: '#4EDEA3',
    fontSize: 42,
    fontWeight: '900',
  },
  gameInfo: {
    flex: 1,
    marginLeft: 16,
    paddingVertical: 4,
  },
  gameTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  genre: {
    marginTop: 8,
    color: colors.textMuted,
    fontSize: 14,
  },
  platform: {
    marginTop: 5,
    color: colors.textMuted,
    fontSize: 13,
  },
  price: {
    marginTop: 18,
    color: '#4EDEA3',
    fontSize: 21,
    fontWeight: '900',
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 15,
  },
});
export default SearchGameScreen;
import React from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSelector } from 'react-redux';

import GameCard from '../../components/GameCard';
import { colors } from '../../theme/colors';


function FilterGameScreen(props) {
  const navigation = props.navigation;

  const gamesState = useSelector(
    function (state) {
      return state.games;
    }
  );
  const items = gamesState.items;
  const genreState = React.useState(null);
  const selectedGenre = genreState[0];
  const setSelectedGenre = genreState[1];
  const platformState = React.useState(null);
  const selectedPlatform = platformState[0];
  const setSelectedPlatform = platformState[1];
  const priceState = React.useState(null);
  const selectedPrice = priceState[0];
  const setSelectedPrice = priceState[1];
  const resultState = React.useState([]);
  const filteredGames = resultState[0];
  const setFilteredGames = resultState[1];
  const applyState = React.useState(false);
  const hasAppliedFilter = applyState[0];
  const setHasAppliedFilter = applyState[1];

  function selectRPG() {
    setSelectedGenre('RPG');
  }

  function selectAction() {
    setSelectedGenre('Action');
  }

  function selectStrategy() {
    setSelectedGenre('Strategy');
  }

  function selectIndie() {
    setSelectedGenre('Indie');
  }

  function selectRacing() {
    setSelectedGenre('Racing');
  }

  function selectPC() {
    setSelectedPlatform('PC');
  }

  function selectPlayStation() {
    setSelectedPlatform('PlayStation');
  }

  function selectXbox() {
    setSelectedPlatform('Xbox');
  }

  function selectSwitch() {
    setSelectedPlatform('Switch');
  }
  function selectUnder20() {
    setSelectedPrice('UNDER_20');
  }

  function select20To50() {
    setSelectedPrice('20_TO_50');
  }

  function selectOver50() {
    setSelectedPrice('OVER_50');
  }


  function resetFilters() {

    setSelectedGenre(null);

    setSelectedPlatform(null);

    setSelectedPrice(null);

    setFilteredGames([]);

    setHasAppliedFilter(false);
  }

  function gameMatchesGenre(game) {
    if (selectedGenre == null) {
      return true;
    }
    if (game.genre == null) {
      return false;
    }
    const gameGenre =
      game.genre.toLowerCase();

    const filterGenre =
      selectedGenre.toLowerCase();

    if (gameGenre.includes(filterGenre)) {
      return true;
    }

    return false;
  }

  function gameMatchesPlatform(game) {

    if (selectedPlatform == null) {
      return true;
    }

    if (game.platform == null) {
      return false;
    }

    const gamePlatform =
      game.platform.toLowerCase();

    const filterPlatform =
      selectedPlatform.toLowerCase();

    if (gamePlatform.includes(filterPlatform)) {
      return true;
    }

    return false;
  }


  function gameMatchesPrice(game) {
    if (selectedPrice == null) {
      return true;
    }
    const price =
      Number(game.price);
    if (selectedPrice === 'UNDER_20') {
      if (price < 20) {
        return true;
      }
      return false;
    }
    if (selectedPrice === '20_TO_50') {

      if (price >= 20 && price <= 50) {
        return true;
      }
      return false;
    }
    if (selectedPrice === 'OVER_50') {

      if (price > 50) {
        return true;
      }
      return false;
    }
    return true;
  }

  function gameMatchesFilter(game) {
    const genreOk =
      gameMatchesGenre(game);
    const platformOk =
      gameMatchesPlatform(game);
    const priceOk =
      gameMatchesPrice(game);
    if (
      genreOk &&
      platformOk &&
      priceOk
    ) {
      return true;
    }

    return false;
  }
  function applyFilters() {

    const result =
      items.filter(gameMatchesFilter);

    setFilteredGames(result);

    setHasAppliedFilter(true);
  }
  function openGameDetail(gameId) {

    navigation.navigate(
      'GameDetail',
      {
        gameId: gameId
      }
    );
  }
  function renderFilteredGame(game) {
    function handleGamePress() {
      openGameDetail(
        game.id
      );
    }
    return (
      <GameCard
        key={game.id.toString()}
        game={game}
        onPress={handleGamePress}
      />
    );
  }

  function getGenreButtonStyle(genre) {
    if (selectedGenre === genre) {
      return [
        styles.chip,
        styles.selectedChip
      ];
    }
    return styles.chip;
  }

  function getGenreTextStyle(genre) {
    if (selectedGenre === genre) {
      return [
        styles.chipText,
        styles.selectedChipText
      ];
    }
    return styles.chipText;
  }

  function getPlatformButtonStyle(platform) {
    if (selectedPlatform === platform) {
      return [
        styles.chip,
        styles.selectedChip
      ];
    }
    return styles.chip;
  }
  function getPlatformTextStyle(platform) {
    if (selectedPlatform === platform) {
      return [
        styles.chipText,
        styles.selectedChipText
      ];
    }
    return styles.chipText;
  }
  function getPriceButtonStyle(priceType) {

    if (selectedPrice === priceType) {
      return [
        styles.priceButton,
        styles.selectedPriceButton
      ];
    }
    return styles.priceButton;
  }
  function getPriceTextStyle(priceType) {
    if (selectedPrice === priceType) {
      return [
        styles.priceText,
        styles.selectedPriceText
      ];
    }
    return styles.priceText;
  }
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Filter
        </Text>
        <Text style={styles.sectionTitle}>
          Genre
        </Text>
        <View style={styles.chipContainer}>
          <Pressable
            onPress={selectRPG}
            style={getGenreButtonStyle('RPG')}
          >
            <Text
              style={getGenreTextStyle('RPG')}
            >
              RPG
            </Text>
          </Pressable>
          <Pressable
            onPress={selectAction}
            style={getGenreButtonStyle('Action')}
          >
            <Text
              style={getGenreTextStyle('Action')}
            >
              Action
            </Text>
          </Pressable>
          <Pressable
            onPress={selectStrategy}
            style={getGenreButtonStyle('Strategy')}
          >
            <Text
              style={getGenreTextStyle('Strategy')}
            >
              Strategy
            </Text>
          </Pressable>
          <Pressable
            onPress={selectIndie}
            style={getGenreButtonStyle('Indie')}
          >
            <Text
              style={getGenreTextStyle('Indie')}
            >
              Indie
            </Text>

          </Pressable>
          <Pressable
            onPress={selectRacing}
            style={getGenreButtonStyle('Racing')}
          >
            <Text
              style={getGenreTextStyle('Racing')}
            >
              Racing
            </Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>
          Platform
        </Text>
        <View style={styles.chipContainer}>
          <Pressable
            onPress={selectPC}
            style={getPlatformButtonStyle('PC')}
          >
            <Text
              style={getPlatformTextStyle('PC')}
            >
              PC
            </Text>
          </Pressable>
          <Pressable
            onPress={selectPlayStation}
            style={getPlatformButtonStyle(
              'PlayStation'
            )}
          >
            <Text
              style={getPlatformTextStyle(
                'PlayStation'
              )}
            >
              PlayStation
            </Text>
          </Pressable>
          <Pressable
            onPress={selectXbox}
            style={getPlatformButtonStyle(
              'Xbox'
            )}
          >
            <Text
              style={getPlatformTextStyle(
                'Xbox'
              )}
            >
              Xbox
            </Text>
          </Pressable>
          <Pressable
            onPress={selectSwitch}
            style={getPlatformButtonStyle(
              'Switch'
            )}
          >
            <Text
              style={getPlatformTextStyle(
                'Switch'
              )}
            >
              Switch
            </Text>
          </Pressable>
        </View>
        <Text style={styles.sectionTitle}>
          Price
        </Text>
        <View style={styles.priceContainer}>
          <Pressable
            onPress={selectUnder20}
            style={getPriceButtonStyle(
              'UNDER_20'
            )}
          >
            <Text
              style={getPriceTextStyle(
                'UNDER_20'
              )}
            >
              Under $20
            </Text>

          </Pressable>
          <Pressable
            onPress={select20To50}
            style={getPriceButtonStyle(
              '20_TO_50'
            )}
          >
            <Text
              style={getPriceTextStyle(
                '20_TO_50'
              )}
            >
              $20-$50
            </Text>

          </Pressable>
          <Pressable
            onPress={selectOver50}
            style={getPriceButtonStyle(
              'OVER_50'
            )}
          >
            <Text
              style={getPriceTextStyle(
                'OVER_50'
              )}
            >
              $50+
            </Text>

          </Pressable>
        </View>
        <View style={styles.actionContainer}>
          <Pressable
            onPress={resetFilters}
            style={styles.resetButton}
          >
            <Text style={styles.resetText}>
              Reset
            </Text>
          </Pressable>
          <Pressable
            onPress={applyFilters}
            style={styles.applyButton}
          >
            <Text style={styles.applyText}>
              Apply Filters
            </Text>
          </Pressable>
        </View>
        {
          hasAppliedFilter &&
          (
            <View style={styles.resultContainer}>

              <Text style={styles.resultTitle}>
                Results
              </Text>
              <Text style={styles.resultCount}>
                {filteredGames.length} games found
              </Text>
              {
                filteredGames.length === 0 &&
                (
                  <Text style={styles.noResultText}>
                    No games match these filters.
                  </Text>
                )
              }

              {
                filteredGames.map(
                  renderFilteredGame
                )
              }

            </View>
          )
        }


      </ScrollView>


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
    paddingBottom: 50,
  },


  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 28,
  },


  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 10,
  },


  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
    marginBottom: 24,
  },


  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: colors.surfaceHigh,
  },


  selectedChip: {
    backgroundColor: '#15382D',
    borderWidth: 1,
    borderColor: '#4EDEA3',
  },


  chipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },


  selectedChipText: {
    color: '#4EDEA3',
  },


  priceContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },


  priceButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.surfaceHigh,
  },


  selectedPriceButton: {
    backgroundColor: '#15382D',
    borderWidth: 1,
    borderColor: '#4EDEA3',
  },


  priceText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
  },


  selectedPriceText: {
    color: '#4EDEA3',
  },


  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },


  resetButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.surfaceHigh,
  },


  resetText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },


  applyButton: {
    flex: 2,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#4EDEA3',
  },


  applyText: {
    color: '#003824',
    fontSize: 16,
    fontWeight: '900',
  },


  resultContainer: {
    marginTop: 5,
  },


  resultTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },


  resultCount: {
    color: colors.textMuted,
    marginTop: 3,
    marginBottom: 16,
  },


  noResultText: {
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: 30,
  },

});


export default FilterGameScreen;
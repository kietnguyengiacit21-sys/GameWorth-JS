import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../theme/colors';


function GameCard(props) {
  const game = props.game;
  const onPress = props.onPress;
  let priceText = 'Free';
  if (Number(game.price) !== 0) {
    const priceNumber = Number(game.price);
    priceText = '$' + priceNumber.toFixed(2);
  }

  let genreText = 'Unknown genre';

  if (game.genre) {
    genreText = game.genre;
  }

  let metadataText = genreText;

  if (game.platform) {
    metadataText =
      metadataText + ' • ' + game.platform;
  }
  function getCardStyle(info) {
    const pressed = info.pressed;
    if (pressed) {
      return [
        styles.card,
        styles.pressed
      ];
    }
    return styles.card;
  }

  if (!game.coverImageUrl) {
    let firstLetter = '';
    if (game.title) {
      firstLetter =
        game.title.charAt(0).toUpperCase();
    }
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={getCardStyle}
      >
        <View style={styles.fallback}>
          <Text style={styles.coverLetter}>
            {firstLetter}
          </Text>
          <View style={styles.info}>
            <Text
              numberOfLines={1}
              style={styles.title}
            >
              {game.title}
            </Text>
            <Text style={styles.price}>
              {priceText}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.metadata}
            >
              {metadataText}
            </Text>

          </View>

        </View>

      </Pressable>
    );
  }

  const imageSource = {
    uri: game.coverImageUrl
  };

  return (

    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={getCardStyle}
    >

      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={styles.backgroundImage}
        imageStyle={styles.imageBorder}

        onError={function (event) {
          console.log(
            'IMAGE ERROR:',
            game.title,
            game.coverImageUrl,
            event.nativeEvent
          );
        }}
      >

        <View style={styles.overlay}>

          <View style={styles.info}>

            <Text
              numberOfLines={1}
              style={styles.title}
            >
              {game.title}
            </Text>


            <Text style={styles.price}>
              {priceText}
            </Text>


            <Text
              numberOfLines={1}
              style={styles.metadata}
            >
              {metadataText}
            </Text>

          </View>

        </View>

      </ImageBackground>

    </Pressable>
  );
}


const styles = StyleSheet.create({

  card: {
    height: 190,
    marginBottom: 14,
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  pressed: {
    opacity: 0.85,
  },

  backgroundImage: {
    flex: 1,
  },

  imageBorder: {
    borderRadius: 16,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },

  info: {
    padding: 14,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  price: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  metadata: {
    marginTop: 5,
    color: '#DDDDDD',
    fontSize: 13,
  },

  fallback: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.surfaceHigh,
  },

  coverLetter: {
    position: 'absolute',
    alignSelf: 'center',
    top: 45,
    color: colors.primary,
    fontSize: 60,
    fontWeight: '900',
  },

});


export default GameCard;
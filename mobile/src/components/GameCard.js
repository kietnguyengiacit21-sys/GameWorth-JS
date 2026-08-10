import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {colors} from '../theme/colors';
function GameCard({game, onPress}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [
        styles.card,
        pressed && styles.pressed,
      ]}>
      {game.coverImageUrl ? (
        <Image
          source={{uri: game.coverImageUrl}}
          style={styles.cover}
        />
      ) : (
        <View style={[styles.cover, styles.coverFallback]}>
          <Text style={styles.coverLetter}>
            {game.title.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.title}>
            {game.title}
          </Text>
          <Text style={styles.price}>
            {Number(game.price) === 0
              ? 'Free'
              : `$${Number(game.price).toFixed(2)}`}
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.metadata}>
          {game.genre || 'Unknown genre'}
          {game.platform ? ` • ${game.platform}` : ''}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
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
  cover: {
    width: '100%',
    height: 150,
  },
  coverFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
  },
  coverLetter: {
    color: colors.primary,
    fontSize: 48,
    fontWeight: '900',
  },
  info: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },
  price: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  metadata: {
    marginTop: 5,
    color: colors.textMuted,
    fontSize: 13,
  },
});

export default GameCard;

import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
import {colors} from '../../theme/colors';

const pages = [
  {
    title: 'Discover New Games',
    description: 'Browse trending titles, curated recommendations, and the latest releases in one app.',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Rate your Games',
    description: 'Save your reviews, compare ratings, and share feedback with the community.',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Manage your library',
    description: 'Keep every favorite game, wishlist item and play record ready to revisit.',
    image:
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
  },
];

function OnboardingScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const {width} = Dimensions.get('window');

  function handleNext() {
    if (index < pages.length - 1) {
      setIndex(i => i + 1);
    }
  }

  function handleSkip() {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTabs', params: {screen: 'Home'}}],
    });
  }

  function handleGetStarted() {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTabs', params: {screen: 'Home'}}],
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <View style={[styles.card, {width: width - 48}]}> 
          <Image source={{uri: pages[index].image}} style={[styles.image, {width: width - 96, height: Math.round((width - 96) * 1.6)}]} />
          <Text style={styles.featureTitleWhite}>{pages[index].title}</Text>
          <Text style={styles.featureTextWhite}>{pages[index].description}</Text>
        </View>

        <View style={styles.controls}> 
          <View style={styles.pagerRow}>
            {pages.map((_, i) => (
              <View key={i} style={[styles.dot, i === index ? styles.dotActive : null]} />
            ))}
          </View>

          <View style={styles.controlsRow}>
            <Pressable onPress={handleSkip} style={styles.skipBottom}>
              <Text style={styles.skipTextWhite}>Skip</Text>
            </Pressable>
            {index < pages.length - 1 ? (
              <PrimaryButton title="Next" onPress={handleNext} style={styles.nextButton} />
            ) : (
              <PrimaryButton title="Get Started" onPress={handleGetStarted} style={styles.getStartedButton} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#000'},
  wrapper: {flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center'},
  header: {paddingHorizontal: 24, paddingTop: 12},
  container: {flex: 1, padding: 24, justifyContent: 'space-between'},
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },
  card: {
    marginTop: 18,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 10,
  },
  featureTitle: {color: '#fff', fontSize: 20, fontWeight: '800'},
  featureText: {marginTop: 8, color: '#ccc', fontSize: 15, lineHeight: 22},
  featureTitleWhite: {color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 12},
  featureTextWhite: {marginTop: 8, color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 20},
  pagerRow: {flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 12},
  dot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#333', marginHorizontal: 6},
  dotActive: {backgroundColor: '#fff'},
  actionRow: {marginTop: 28, paddingHorizontal: 12},
  nextButton: {},
  getStartedButton: {},
  skipBottom: {padding: 8, alignSelf: 'center', marginBottom: 8},
  skipText: {color: '#ccc'},
  skipTextWhite: {color: '#fff', marginRight: 12},
  image: {width: '100%', height: 320, borderRadius: 12, marginBottom: 12, backgroundColor: '#111'},
  bottomRow: {alignItems: 'center', paddingBottom: 24},
  controls: {position: 'absolute', bottom: 36, left: 0, right: 0, alignItems: 'center'},
  controlsRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
});

export default OnboardingScreen;

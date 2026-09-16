import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useVideoPlayer, VideoView } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/ui';
import { Spacing, TouchTarget } from '@/theme/tokens';

const welcomeVideo = require('../../../assets/videos/welcome.mp4');

export default function WelcomeScreen() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(true);
  }, []);

  const player = useVideoPlayer(welcomeVideo, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.videoLayer}>
        {showVideo ? <VideoView player={player} style={styles.video} contentFit="cover" nativeControls={false} /> : null}
      </View>
      <LinearGradient colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0.7)']} style={styles.overlay} />

      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Welcome to <Text style={styles.titleGold}>Zpay</Text>
          </Text>
          <Text style={styles.tagline}>Money, Simplified</Text>

          <View style={styles.actions}>
            <Link href="/login" asChild>
              <Button label="Login" style={styles.loginBtn} labelStyle={styles.loginLabel} />
            </Link>
            <Link href="/signup" asChild>
              <Button label="Create Account" style={styles.createBtn} labelStyle={styles.createLabel} />
            </Link>
            <Text style={styles.terms}>
              By continuing, you agree to our <Link href="/terms" asChild><Text style={styles.termsLink}>Terms and Conditions</Text></Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const GOLD = '#F5B82E';
const GOLD_END = '#D99614';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safe: {
    flex: 1,
    zIndex: 2,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  title: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  titleGold: {
    color: GOLD,
    fontWeight: '900',
  },
  tagline: {
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.75)',
  },
  actions: {
    alignSelf: 'stretch',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  loginBtn: {
    backgroundColor: GOLD,
    borderColor: GOLD_END,
    borderRadius: 999,
    minHeight: TouchTarget.standard,
  },
  loginLabel: {
    color: '#FFFFFF',
  },
  createBtn: {
    backgroundColor: '#1F2733',
    borderColor: 'rgba(255,255,255,0.35)',
    borderRadius: 999,
    minHeight: TouchTarget.standard,
  },
  createLabel: {
    color: '#FFFFFF',
  },
  terms: {
    marginTop: Spacing.xs,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.65)',
  },
  termsLink: {
    color: GOLD,
    textDecorationLine: 'underline',
  },
});
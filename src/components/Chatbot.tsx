import { useLayoutEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  type NativeSyntheticEvent,
  type TextInputContentSizeChangeEventData,
} from 'react-native';

import { Icon } from '@/components/Icon';
import { Text, View } from '@/components/ui';
import { useChat, useSendChatMessage } from '@/hooks/queries';
import type { ChatMessage } from '@/lib/api';
import { BottomTabInset, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const QUICK_REPLIES = [
  'How do I buy airtime?',
  'How do I fund my wallet?',
  'Buy data bundle',
  'Pay electricity',
  'Talk to a human',
];

function timeLabel(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const FAB_SIZE = 58;

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

export function Chatbot() {
  const colors = useTheme();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [inputHeight, setInputHeight] = useState(44);
  const { data: thread } = useChat();
  const send = useSendChatMessage();

  const messages: ChatMessage[] = thread?.messages ?? [];
  const canSend = draft.trim().length > 0 && !send.isPending;

  function handleSend(text?: string) {
    const value = (text ?? draft).trim();
    if (!value) return;
    send.mutate(value);
    setDraft('');
  }

  function onContentSizeChange(e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) {
    const h = e.nativeEvent.contentSize.height;
    setInputHeight(Math.min(Math.max(h + 8, 44), 120));
  }

  const { width: winW, height: winH } = useWindowDimensions();

  const minLeft = Spacing.lg;
  const maxLeft = Math.max(minLeft, winW - FAB_SIZE - Spacing.lg);
  const minBottom = BottomTabInset + Spacing.xl;
  const maxBottom = Math.max(minBottom, winH - FAB_SIZE - Spacing.lg);

  const fabLeft = useRef(new Animated.Value(maxLeft)).current;
  const fabBottom = useRef(new Animated.Value(minBottom)).current;
  const gesture = useRef({ x: maxLeft, y: minBottom, moved: 0 });

  // Keep the FAB in-bounds when the viewport resizes so it never overflows the screen.
  useLayoutEffect(() => {
    const nx = clamp(gesture.current.x, minLeft, maxLeft);
    const ny = clamp(gesture.current.y, minBottom, maxBottom);
    gesture.current.x = nx;
    gesture.current.y = ny;
    fabLeft.setValue(nx);
    fabBottom.setValue(ny);
  }, [winW, winH, minLeft, maxLeft, minBottom, maxBottom, fabLeft, fabBottom]);

  const fabPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        gesture.current.moved = 0;
        fabLeft.stopAnimation();
        fabBottom.stopAnimation();
      },
      onPanResponderMove: (_evt, g) => {
        gesture.current.moved += Math.abs(g.dx) + Math.abs(g.dy);
        const nx = clamp(gesture.current.x + g.dx, minLeft, maxLeft);
        const ny = clamp(gesture.current.y - g.dy, minBottom, maxBottom);
        gesture.current.x = nx;
        gesture.current.y = ny;
        fabLeft.setValue(nx);
        fabBottom.setValue(ny);
      },
      onPanResponderRelease: () => {
        // Treat a tiny movement as a tap -> open the chat.
        if (gesture.current.moved < 8) {
          setOpen(true);
          return;
        }
        // Snap the FAB to the nearest edge so it always looks tidy.
        const targetLeft = gesture.current.x < winW / 2 ? minLeft : maxLeft;
        gesture.current.x = targetLeft;
        Animated.spring(fabLeft, {
          toValue: targetLeft,
          useNativeDriver: false,
          bounciness: 4,
          speed: 14,
        }).start();
      },
    })
  ).current;

  if (!open) {
    return (
      <Animated.View
        style={[styles.fabAnimated, { left: fabLeft, bottom: fabBottom }]}
        {...fabPan.panHandlers}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Open support chat"
          style={[styles.fab, { backgroundColor: colors.accent }]}>
          <Icon name="chatbubble-ellipses" size={26} color="#0a0f10" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.wrapper, { bottom: Spacing.lg, backgroundColor: colors.surfaceElevated }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View surface="surfaceElevated" style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatar, { backgroundColor: 'rgba(0,244,254,0.15)' }]}>
            <Icon name="sparkles" size={16} color={colors.accent} />
          </View>
          <View surface="surfaceElevated">
            <Text variant="bodyBold">ZPAY Assistant</Text>
            <View style={styles.onlineRow}>
              <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
              <Text variant="caption" color="textMuted">
                Online · Replies instantly
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => setOpen(false)} accessibilityRole="button" style={styles.iconBtn}>
          <Icon name="close" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.msgScroll}
        contentContainerStyle={styles.msgContent}
        onContentSizeChange={() => {
          // auto-scroll not needed; simple approach
        }}>
        {messages.length === 0 ? (
          <View surface="surfaceElevated" style={styles.botWelcome}>
            <Icon name="chatbubble-ellipses-outline" size={40} color={colors.accent} />
            <Text variant="body" style={styles.welcomeText}>
              Hi! 👋 I'm the ZPAY virtual assistant. Ask me about funding your wallet, airtime, data, electricity, cable TV or school payments — or connect with a human agent.
            </Text>
          </View>
        ) : (
          messages.map((m) => {
            const isUser = m.role === 'user';
            const isAdmin = m.role === 'admin';
            return (
              <View
                key={m.id}
                surface="background"
                style={[
                  styles.bubble,
                  isUser
                    ? [styles.userBubble, { backgroundColor: colors.accent }]
                    : [
                        styles.botBubble,
                        { backgroundColor: colors.input },
                        isAdmin && { borderWidth: 1, borderColor: 'rgba(52,211,153,0.5)' },
                      ],
                ]}>
                {isAdmin ? (
                  <Text variant="caption" color="success">
                    ADMIN
                  </Text>
                ) : null}
                <Text style={isUser ? styles.userText : styles.botText}>{m.text}</Text>
                <Text variant="caption" style={[styles.time, { color: isUser ? '#0a0f10' : colors.textMuted }]}>
                  {timeLabel(m.createdAt)}
                </Text>
              </View>
            );
          })
        )}
        {send.isPending ? (
          <View surface="background" style={[styles.bubble, styles.botBubble, { backgroundColor: colors.input }]}>
            <ActivityIndicator size="small" color={colors.accent} />
          </View>
        ) : null}
      </ScrollView>

      {messages.length < 2 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickRow} contentContainerStyle={styles.quickContent}>
          {QUICK_REPLIES.map((q) => (
            <Pressable key={q} onPress={() => handleSend(q)} style={[styles.chip, { borderColor: colors.border, backgroundColor: colors.input }]}>
              <Text variant="small" color="textSecondary">
                {q}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      <View style={[styles.inputWrap, { borderTopColor: colors.border }]}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Type a message..."
          placeholderTextColor={colors.textMuted}
          multiline
          onSubmitEditing={() => handleSend()}
          returnKeyType="send"
          blurOnSubmit={false}
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text, borderColor: colors.border },
            { height: inputHeight },
          ]}
          onContentSizeChange={onContentSizeChange}
        />
        <TouchableOpacity
          disabled={!canSend}
          onPress={() => handleSend()}
          accessibilityRole="button"
          style={[styles.sendBtn, { backgroundColor: canSend ? colors.accent : colors.input }]}>
          {send.isPending ? <ActivityIndicator size="small" color="#0a0f10" /> : <Icon name="send" size={18} color="#0a0f10" />}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fabAnimated: {
    position: 'absolute',
    zIndex: 50,
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  wrapper: {
    position: 'absolute',
    right: Spacing.lg,
    left: Spacing.lg,
    maxHeight: 540,
    borderRadius: Radii.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    overflow: 'hidden',
    zIndex: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgScroll: {
    maxHeight: 360,
  },
  msgContent: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  botWelcome: {
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  welcomeText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radii.lg,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 3,
  },
  botBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 3,
  },
  userText: {
    color: '#0a0f10',
    fontWeight: '600',
  },
  botText: {
    color: '#fff',
  },
  time: {
    marginTop: 3,
    textAlign: 'right',
  },
  quickRow: {
    flexGrow: 0,
  },
  quickContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: StyleSheet.hairlineWidth,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md - 2,
    paddingBottom: Spacing.md - 2,
    fontSize: 15,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { Image, Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Icon } from './Icon';
import { Button, Text } from './ui';
import { ZpayLogo } from './ZpayLogo';
import { EXAM_PROVIDER_LOGOS, PROVIDER_LOGOS } from '@/constants/provider-logos';
import { formatNaira, formatDateTime } from '@/lib/format';
import { copyToClipboard } from '@/lib/clipboard';
import type { Transaction } from '@/lib/api';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export interface ReceiptProps {
  transaction: Transaction;
  onClose?: () => void;
}

export function Receipt({ transaction, onClose }: ReceiptProps) {
  const colors = useTheme();
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const logo =
    (transaction.providerId && PROVIDER_LOGOS[transaction.providerId]) ||
    EXAM_PROVIDER_LOGOS[transaction.service] ||
    null;

  const handleCopyRef = async () => {
    if (!transaction.reference) return;
    await copyToClipboard(transaction.reference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCopyToken = async () => {
    if (!transaction.purchasedCode) return;
    await copyToClipboard(transaction.purchasedCode);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `ZPAY Transaction Receipt\nStatus: Successful\nService: ${transaction.serviceName}\nAmount: ${formatNaira(transaction.total)}\nReference: ${transaction.reference}\nPaid on: ${formatDateTime(transaction.createdAt)}`,
      });
    } catch {
      // share dismissed
    }
  };

  const handleDownload = () => {
    // Ready for download / export receipt feature
    alert('Receipt ready for download');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text variant="title">Receipt</Text>
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close receipt" hitSlop={Spacing.md} style={styles.closeBtn}>
          <Icon name="close" size={IconSize.md} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <ZpayLogo size={120} style={styles.logo} />
          <Text variant="caption" color="textMuted" style={styles.receiptSubtitle}>
            Official Transaction Receipt
          </Text>

          <View style={[styles.badge, { backgroundColor: colors.successSoft }]}>
            <Icon name="checkmark" size={28} color={colors.success} />
          </View>

          <Text variant="bodyBold" color="success" style={styles.successText}>
            Payment Successful
          </Text>

          <Text variant="amount" color="accent" style={styles.amount}>
            {formatNaira(transaction.total)}
          </Text>

          <View style={styles.providerSection}>
            {logo ? (
              <Image source={logo} style={styles.providerLogo} resizeMode="contain" />
            ) : (
              <View style={[styles.fallbackIcon, { backgroundColor: colors.accentSoft }]}>
                <Icon name="receipt" size={24} color={colors.accent} />
              </View>
            )}
            <Text variant="smallBold" color="text">
              {transaction.serviceName}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.rows}>
            <Row label="Paid on" value={formatDateTime(transaction.createdAt)} />
            <Row label="Service" value={transaction.serviceName} />
            {transaction.customerIdentifier ? (
              <Row label="Account / Customer ID" value={transaction.customerIdentifier} />
            ) : null}

            {transaction.reference ? (
              <View style={styles.rowWithAction}>
                <View style={styles.rowLabelWrap}>
                  <Text variant="small" color="textSecondary">ZPAY Reference</Text>
                  <Text variant="smallBold" style={{ color: colors.text }} numberOfLines={1}>
                    {transaction.reference}
                  </Text>
                </View>
                <Pressable onPress={handleCopyRef} style={styles.copyBtn} accessibilityRole="button" accessibilityLabel="Copy reference">
                  <Text variant="caption" color="accent" style={styles.copyText}>
                    {copiedRef ? 'Copied!' : 'Copy'}
                  </Text>
                </Pressable>
              </View>
            ) : null}

            {transaction.purchasedCode ? (
              <View style={[styles.tokenBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.accent }]}>
                <View style={styles.tokenHeader}>
                  <Text variant="caption" color="accent" style={styles.tokenLabel}>
                    CONFIRMATION / TOKEN CODE
                  </Text>
                  <Pressable onPress={handleCopyToken} accessibilityRole="button" accessibilityLabel="Copy token">
                    <Text variant="caption" color="accent" style={styles.copyText}>
                      {copiedToken ? 'Copied!' : 'Copy'}
                    </Text>
                  </Pressable>
                </View>
                <Text variant="heading" style={[styles.tokenValue, { color: colors.text }]}>
                  {transaction.purchasedCode}
                </Text>
              </View>
            ) : null}

            {transaction.providerReference ? (
              <Row label="Provider Reference" value={transaction.providerReference} />
            ) : null}

            <Row label="Payment Method" value="ZPAY Wallet" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <Button label="Share Receipt" onPress={onShare} />
        <Button label="Download Receipt" variant="secondary" onPress={handleDownload} />
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const colors = useTheme();
  return (
    <View style={styles.row}>
      <Text variant="small" color="textSecondary">
        {label}
      </Text>
      <Text variant="smallBold" style={{ color: colors.text, textAlign: 'right', flex: 1, marginLeft: Spacing.md }} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  card: {
    borderRadius: Radii.xxl,
    borderWidth: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logo: {
    marginBottom: -4,
  },
  receiptSubtitle: {
    letterSpacing: 0.6,
    marginBottom: Spacing.xs,
  },
  badge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xs,
  },
  successText: {
    fontSize: 15,
  },
  amount: {
    marginVertical: Spacing.xs,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '900',
  },
  providerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  providerLogo: {
    width: 28,
    height: 28,
  },
  fallbackIcon: {
    width: 28,
    height: 28,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    alignSelf: 'stretch',
    marginVertical: Spacing.lg,
  },
  rows: {
    alignSelf: 'stretch',
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabelWrap: {
    flex: 1,
    gap: 2,
  },
  copyBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.sm,
    backgroundColor: 'rgba(245,184,46,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245,184,46,0.25)',
  },
  copyText: {
    fontWeight: '700',
  },
  tokenBox: {
    alignSelf: 'stretch',
    borderRadius: Radii.lg,
    borderWidth: 1.5,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenLabel: {
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  tokenValue: {
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 22,
    fontWeight: '900',
  },
  actions: {
    alignSelf: 'stretch',
    gap: Spacing.md,
    paddingBottom: Spacing.xxl,
    paddingTop: Spacing.sm,
  },
});

import chroma from 'chroma-js';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  hero: ViewStyle;
  topo: ViewStyle;
  identity: ViewStyle;
  iconTile: ViewStyle;
  icon: TextStyle;
  identityText: ViewStyle;
  brand: TextStyle;
  model: TextStyle;
  baseLabelPlate: ViewStyle;
  baseLabel: TextStyle;
  headline: ViewStyle;
  figure: TextStyle;
  unit: TextStyle;
  stats: ViewStyle;
  stat: ViewStyle;
  statLabel: TextStyle;
  statValue: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();
  const onHero = theme.colors.onPrimary;

  const styles = StyleSheet.create<Style>({
    hero: {
      alignSelf: 'stretch',
      marginHorizontal: theme.space[3],
      padding: theme.space[3],
      borderRadius: 22,
      backgroundColor: theme.colors.primary,
      overflow: 'hidden',
    },
    topo: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.16,
    },
    identity: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[2],
    },
    iconTile: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: chroma(onHero).alpha(0.14).css(),
    },
    icon: {
      color: onHero,
    },
    identityText: {
      flex: 1,
    },
    brand: {
      color: onHero,
      opacity: 0.75,
    },
    model: {
      color: onHero,
    },
    baseLabelPlate: {
      alignSelf: 'flex-start',
      marginTop: theme.space[3],
      paddingHorizontal: theme.space[2],
      paddingVertical: theme.space[1],
      borderRadius: theme.space[1],
      backgroundColor: chroma(theme.colors.inverseSurface).darken(0.6).alpha(0.82).css(),
    },
    baseLabel: {
      color: theme.colors.tertiary,
      textTransform: 'uppercase',
      letterSpacing: 1.6,
    },
    headline: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: theme.space[1],
    },
    figure: {
      color: onHero,
    },
    unit: {
      marginLeft: theme.space[2],
      color: onHero,
      opacity: 0.7,
    },
    stats: {
      flexDirection: 'row',
      marginTop: theme.space[3],
      paddingTop: theme.space[2],
      borderTopWidth: theme.borderWeight[1],
      borderTopColor: chroma(onHero).alpha(0.18).css(),
    },
    stat: {
      flex: 1,
    },
    statLabel: {
      color: onHero,
      opacity: 0.7,
    },
    statValue: {
      color: onHero,
    },
  });

  return styles;
}

import { StyleSheet } from 'react-native';
import { THEME } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.OVERLAY,
  },
  content: {
    width: 311,
    backgroundColor: THEME.COLORS.SHAPE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    margin: 16,
  },
  discord: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,

    backgroundColor: THEME.COLORS.BACKGROUND_800,
    borderRadius: 4,
    height: 48,
    width: 231,
    paddingVertical: 11,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
});
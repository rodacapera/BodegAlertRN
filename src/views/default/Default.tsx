import React, {Fragment, PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ThemeAttributeBackgroundPropType,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {networkSettings, showNetworks} from '../../hooks/shellyActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {backgroundStyle, isDarkMode} from '../../globals/styles/screenMode';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type BackgroundStyle = {
  backgroundColor: string;
};

const Default = () => {
  function Section({children, title}: SectionProps): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'red'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
            ooooo
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => showNetworks()}>
            <Text>Networks</Text>
            <Text
              style={[
                {
                  color: isDarkMode ? Colors.lighter : Colors.dark,
                },
              ]}>
              Show Networks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => networkSettings('Anny', '1110461869')}>
            <Text>Set Button</Text>
            <Text
              style={[
                {
                  color: isDarkMode ? Colors.lighter : Colors.dark,
                },
              ]}>
              Configure button
            </Text>
          </TouchableOpacity>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Default;

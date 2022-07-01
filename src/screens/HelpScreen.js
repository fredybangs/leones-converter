import React from 'react';
import {
  SafeAreaView,
  Text,
  Linking,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import ConversionTable from '../components/ConversionTable';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {height} = Dimensions.get('screen');

const HelpSCreen = () => {
  function handlePress(link_val) {
    if (link_val === 'gmail') {
      Linking.openURL('mailto:alfredbangura77@gmail.com');
      return;
    } else {
      Linking.openURL('whatsapp://send?text=hello&phone=+23277354532');
      return;
    }
  }
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'center',
        paddingVertical: 15,
      }}>
      <ScrollView>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          About
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 13,
            textAlign: 'center',
            paddingHorizontal: 8,
          }}>
          This app is just a tool to help ease the redenomination of the leone
          process; the app works totally offline. The conversion in the app is
          based on the FAQ document released by Bank of Sierra Leone.
        </Text>
        <ConversionTable />
        <View style={{alignSelf: 'center', marginTop: 15}}>
          <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20}}>
            Leave Feedback
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => handlePress('whatsapp')}
            style={[styles.buttonContainer, {backgroundColor: '#25D366'}]}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name="logo-whatsapp"
                style={styles.icon}
                size={22}
                color="#fff"
              />
            </View>
            <View style={styles.btnTxtWrapper}>
              <Text style={[styles.buttonText, {color: '#fff'}]}>WhatsApp</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress('gmail')}
            style={[styles.buttonContainer, {backgroundColor: '#EA4335'}]}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name="mail-outline"
                style={styles.icon}
                size={22}
                color="#fff"
              />
            </View>
            <View style={styles.btnTxtWrapper}>
              <Text style={[styles.buttonText, {color: '#fff'}]}>Gmail</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '45%',
    height: height / 16,
    padding: 10,
    borderRadius: 3,
    flexDirection: 'row',
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HelpSCreen;

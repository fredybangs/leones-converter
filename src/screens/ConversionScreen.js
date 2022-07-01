import React from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import {Button, TextInput, IconButton, Snackbar} from 'react-native-paper';
import converter from 'number-to-words';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConversionScreen = () => {
  const [amount, setAmount] = React.useState('');
  const [newAmount, setNewAmount] = React.useState({figure: '', inWords: ''});
  const [cent, setCent] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const copyToClipboard = () => {
    Clipboard.setString(`Le. ${newAmount.figure.toString()}`);
    setVisible(true);
  };

  const handleReset = () => {
    setAmount('');
    setNewAmount('');
    setCent(false);
    return;
  };

  const checkField = val => {
    var hasNumber = /\d/;

    if (!amount) {
      Alert.alert(
        'No amount specified',
        'Please the specify amount to be converted',
      );
      return;
    }
    if (!hasNumber.test(amount)) {
      Alert.alert('Invalid input', 'Not digit found');
      return;
    }
    if (amount.replace(/\D/g, '').length > 19) {
      Alert.alert(
        'Maximum amount exceeded',
        'Maximum of ninteen (19) digits is allowed.',
      );
      return;
    } else {
      handleConversion(val);
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleConversion = new_old => {
    let val = Number(amount.replace(/\D/g, ''));

    if (new_old === 'old') {
      setCent(false);
      let new_val = val * 1000;
      setNewAmount({
        inWords: capitalizeFirstLetter(`${converter.toWords(new_val)} Leones`),
        figure: new_val,
      });
      return;
    } else {
      if (val.toString().length <= 3) {
        setCent(true);
        let new_val = val / 10;
        setNewAmount({
          inWords: `${
            new_val < 1
              ? ''
              : capitalizeFirstLetter(`${converter.toWords(new_val)} Cent`)
          }`,
          figure: new_val,
        });
      } else {
        setCent(false);
        let new_val = val / 1000;
        let cent_val = Number(new_val.toString().split('.').pop());

        if (cent_val && new_val % 1 !== 0) {
          let c_val = cent_val / 10;

          setNewAmount({
            inWords: capitalizeFirstLetter(
              `${converter.toWords(new_val)} Leones ${
                c_val < 1
                  ? ''
                  : '-' +
                    ' ' +
                    capitalizeFirstLetter(converter.toWords(c_val)) +
                    ' cents'
              }`,
            ),
            figure: new_val,
          });
        } else {
          setNewAmount({
            inWords: capitalizeFirstLetter(
              `${converter.toWords(new_val)} Leones`,
            ),
            figure: new_val,
          });
        }
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        action={{
          label: 'Done',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        Amount copied to clipboard!
      </Snackbar>
      <Text style={{fontWeight: 'bold', color: '#000'}}>
        New - Old Leones Converter
      </Text>
      <View style={{width: '100%', marginTop: 10}}>
        <TextInput
          label="Amount (Le.)"
          keyboardType="numeric"
          placeholder="Enter amount here..."
          mode="outlined"
          style={{fontSize: 17, fontWeight: 'bold', marginBottom: 10}}
          value={amount}
          onChangeText={val => setAmount(val)}
        />
      </View>

      <Button
        style={{backgroundColor: 'green', width: '80%', marginTop: 15}}
        onPress={() => checkField('new')}>
        <Text style={{color: '#fff'}}>CONVERT TO NEW LEONES</Text>
      </Button>
      <Button
        style={{backgroundColor: 'blue', width: '80%', marginTop: 15}}
        onPress={() => checkField('old')}>
        <Text style={{color: '#fff'}}>CONVERT TO OLD LEONES</Text>
      </Button>
      {!newAmount.figure ? null : (
        <View style={{marginTop: 30, alignItems: 'center'}}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>
            CONVERSION AMOUNT
          </Text>
          {cent ? (
            <Text style={{color: '#000', fontSize: 30}}>
              {newAmount.figure
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
              cent
            </Text>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#000', fontSize: 30}}>
                Le.{' '}
                {newAmount.figure
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
              <IconButton
                icon={() => (
                  <Ionicons name="copy-outline" size={20} color="grey" />
                )}
                size={20}
                onPress={() => copyToClipboard()}
              />
            </View>
          )}

          <Text style={{color: 'grey'}}>{newAmount.inWords}</Text>
          <Button
            style={{backgroundColor: 'red', width: '80%', marginTop: 15}}
            onPress={() => handleReset()}>
            <Text style={{color: '#fff'}}>Reset</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ConversionScreen;

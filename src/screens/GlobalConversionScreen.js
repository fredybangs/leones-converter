/* eslint-disable no-alert */
/* eslint-disable no-extend-native */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import currency_list from '../global/data/countries.json';
import {
  FAB,
  TextInput,
  useTheme,
  Button,
  IconButton,
  Snackbar,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import converter from 'number-to-words';
import Clipboard from '@react-native-clipboard/clipboard';

const GlobalConversionScreen = () => {
  const [amount, setAmount] = useState('');
  const [currValues, setCurrValues] = useState({
    convert_from: 'SLL',
    convert_to: 'USD',
  });
  const [convAmount, setConvAMount] = useState({
    figure: '',
    words: '',
    currCode: '',
  });
  const [rate, setRate] = useState('');
  const [currencies, setCurrencies] = useState([]);

  const [visible, setVisible] = React.useState(false);

  const handleReset = () => {
    setAmount('');
    setRate('');
    setConvAMount({
      figure: '',
      words: '',
      currCode: '',
    });
    setCurrValues({
      convert_from: 'SLL',
      convert_to: 'USD',
    });
    return;
  };

  const onDismissSnackBar = () => setVisible(false);

  const copyToClipboard = () => {
    Clipboard.setString(`${convAmount.figure.toString()}`);
    setVisible(true);
  };
  useEffect(() => {
    // getCurrencies();
    setCurrencies(currency_list);
  }, []);
  const {colors} = useTheme();

  const onCurrencySwap = () => {
    setCurrValues({
      ...currValues,
      convert_from: currValues.convert_to,
      convert_to: currValues.convert_from,
    });
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
      convertCurrency(currValues.convert_from, currValues.convert_to, amount);
    }
  };

  const convertCurrency = async (fromCurrency, toCurrency, convAmount) => {
    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);

    var url = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`;
    try {
      await axios
        .get(url)
        .then(response => {
          let res = response.data;
          if (res.success) {
            let converted_val = res.result * Number(convAmount);
            if (toCurrency === 'SLL') {
              let new_leones = Number((converted_val / 1000).toFixed(6));
              setConvAMount({
                ...convAmount,
                figure: new_leones,
                currCode: toCurrency,
                words:
                  new_leones < 1
                    ? ''
                    : capitalizeFirstLetter(
                        `${converter.toWords(new_leones)} ${toCurrency}`,
                      ),
              });
              setRate(`1 ${fromCurrency} = ${res.result} ${toCurrency}`);
              return;
            }
            if (fromCurrency === 'SLL') {
              let new_leones = Number((converted_val * 1000).toFixed(6));
              setConvAMount({
                ...convAmount,
                figure: new_leones,
                currCode: toCurrency,
                words:
                  new_leones < 1
                    ? ''
                    : capitalizeFirstLetter(
                        `${converter.toWords(new_leones)} ${toCurrency}`,
                      ),
              });
              setRate(`1 ${fromCurrency} = ${res.result} ${toCurrency}`);

              return;
            } else {
              let other_currency = Number(converted_val.toFixed(6));
              setConvAMount({
                ...convAmount,
                figure: other_currency,
                currCode: toCurrency,
                words:
                  converted_val < 1
                    ? ''
                    : capitalizeFirstLetter(
                        `${converter.toWords(converted_val)} ${toCurrency}`,
                      ),
              });
              setRate(`1 ${fromCurrency} = ${res.result} ${toCurrency}`);
            }
            return;
          } else {
            alert('Could not convert, check internet connection');
            return;
          }
        })
        .catch(e => {
          alert('Could not convert, check internet connection');
          return;
        });
    } catch {
      alert('Could not convert, check internet connection');
      return;
    }
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  Number.prototype.commas = function () {
    var s = '',
      temp,
      num = this.toString().split('.'),
      n = num[0];
    while (n.length > 3) {
      temp = n.substring(n.length - 3);
      s = ',' + temp + s;
      n = n.slice(0, -3);
    }
    if (n) s = n + s;
    if (num[1]) s += '.' + num[1];
    return s;
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
      <Text style={{fontWeight: 'bold', color: colors.primary}}>
        Global Exchange Rate
      </Text>
      <View style={{width: '100%', marginTop: 10}}>
        <TextInput
          label="Amount"
          keyboardType="numeric"
          placeholder="Enter amount here..."
          mode="outlined"
          style={{fontSize: 17, fontWeight: 'bold', marginBottom: 10}}
          value={amount}
          onChangeText={val => setAmount(val)}
        />
      </View>
      <View
        style={{
          borderRadius: 15,
          borderWidth: 2,
          overflow: 'hidden',
          height: '8%',
          padding: 0,
          borderColor: colors.primary,
          width: '100%',
        }}>
        <Picker
          style={{width: '100%'}}
          selectedValue={currValues.convert_from}
          onValueChange={itemValue =>
            setCurrValues({...currValues, convert_from: itemValue})
          }>
          {Object.entries(currencies)
            .sort((a, b) => a[1].currencyName.localeCompare(b[1].currencyName))
            .map(currency => (
              <Picker.Item
                style={{color: '#000'}}
                label={`${currency[1].currencyName} - ${currency[1].id}`}
                value={currency[1].id}
                key={currency[1].id}
              />
            ))}
        </Picker>
      </View>
      <FAB
        style={{
          margin: 20,
          backgroundColor: '#00bfa5',
        }}
        icon={() => (
          <Ionicons name="ios-swap-vertical-sharp" size={20} color="#fff" />
        )}
        size={20}
        onPress={() => onCurrencySwap()}
      />
      <View
        style={{
          borderRadius: 15,
          borderWidth: 2,
          overflow: 'hidden',
          height: '8%',
          padding: 0,
          borderColor: colors.primary,
          width: '100%',
        }}>
        <Picker
          style={{width: '100%'}}
          selectedValue={currValues.convert_to}
          onValueChange={itemValue =>
            setCurrValues({...currValues, convert_to: itemValue})
          }>
          {Object.entries(currencies)
            .sort((a, b) => a[1].currencyName.localeCompare(b[1].currencyName))
            .map(currency => (
              <Picker.Item
                style={{color: '#000'}}
                label={`${currency[1].currencyName} - ${currency[1].id}`}
                value={currency[1].id}
                key={currency[1].id}
              />
            ))}
        </Picker>
      </View>
      <Button
        style={{backgroundColor: colors.primary, width: '80%', marginTop: 15}}
        onPress={() => checkField()}>
        <Text style={{color: '#fff'}}>
          CONVERT FROM {currValues.convert_from} TO {currValues.convert_to}
        </Text>
      </Button>
      {!convAmount.figure ? null : (
        <View style={{marginTop: 30, alignItems: 'center'}}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>
            CONVERSION AMOUNT
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#000', fontSize: 30}}>
              {convAmount.figure.commas()} {convAmount.currCode}
            </Text>
            <IconButton
              icon={() => (
                <Ionicons name="copy-outline" size={20} color="grey" />
              )}
              size={20}
              onPress={() => copyToClipboard()}
            />
          </View>
          <Text style={{color: 'grey'}}>{convAmount.words}</Text>
          <Text style={{color: '#000'}}> - {rate ? rate : ''} - </Text>
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

export default GlobalConversionScreen;

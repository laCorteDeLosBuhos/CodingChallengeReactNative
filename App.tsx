import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import Coins from './src/components/coin';
import { getAllCoins, getMarkets } from './src/services/request'
import { Provider as PaperProvider } from 'react-native-paper';
export default function App() {
  const [coins, setCoins] = useState([]);
  const [markets, setMarkets] = useState([])
  const [showDropDown, setShowDropDown] = useState(false);
  const [coin, setCoin] = useState('');
  const [defaults, setDefaults] = useState([
    "bitcoin",
    "ethereum",
    "tether",
    "usd-coin",
    "binancecoin",
    "binance-usd",
    "cardano",
    "ripple",
    "solana"
  ])
  useEffect(() => {
    getAllCoins().then(res => {
      setCoins(res.map((item:any)=>{
        return {
          label: item.name,
          value: item.id,
        }
      }))
    })
    getMarkets(defaults.join(",")).then(res => {
      setMarkets(res)
    })
  }, [])
  useEffect(() => {
    defaults.push(coin)
    getMarkets(defaults.join(",")).then(res => {
      setMarkets(res)
    })
  }, [coin])
  return (
    <><PaperProvider>
<View style={styles.container}>
        <StatusBar style="auto" />

        <View style={{
          backgroundColor: '#3c3c3c',
          width: "100%",
          display: 'flex',
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'nowrap'
        }}>
          <DropDown label={'Crypto'} mode={"outlined"} visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={coin}
            setValue={setCoin}
            list={coins} dropDownStyle={{width:"500px"}}/>

          <Button title='Agregar' ></Button>
        </View>
        <View style={{
          backgroundColor: '#3c3c3c',
          width: "100%",
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>

          {markets.map((item, i) => {
            return <Coins coin={item}></Coins>;
          })}
        </View>
      </View>
    </PaperProvider></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

import currency from 'currency.js';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
export default function Coins(props: any) {
    const [coin, setCoin] = useState(props.coin);
    const USD = (value:any) => currency(value);
    function changeInTime(change: boolean) {
        if (change) {
            return (
                <Text style={styles.up}>
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                </Text>)
        } else {
            return (<Text style={styles.down}>
                {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
            </Text>)
        }
    }

    return (
        <View style={{
            width: '25%',
            padding: '2.5%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: "#fff",
            borderStyle: "solid",
            margin: '5px',
            borderRadius: 25,
            backgroundColor: "#000"
        }}>
            <Image source={coin.image} style={{

                width: 150,
                height: 150,
            }} />
            <Text style={styles.name}>
                {coin.name}
            </Text>
            <Text style={styles.price}>
                {USD(coin.current_price).format()}
            </Text>
            {
                changeInTime(coin.price_change_percentage_24h_in_currency >= 0)

            }

        </View>
    )
}
const styles = StyleSheet.create({
    name: {
        color: "#fff",
        fontSize: 25,
        fontWeight: 'bold'
    },
    price: {
        color: "#fff",
        fontSize: 18,
    },
    up: {
        color: "green"
    },
    down: {
        color: "red"
    }
})
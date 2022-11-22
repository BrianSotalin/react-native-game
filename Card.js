import * as React from 'react';
import { Pressable,Text,StyleSheet } from 'react-native';

export default function Card({onPress, isTurnedOver, children}){
    return(
        <Pressable onPress={onPress} style={isTurnedOver ? styles.cardUp : styles.cardDown}>
            {isTurnedOver?(
            <Text style={styles.text}>{children}</Text>
            ):(
            <Text style={styles.text}>?</Text>
            )}
         
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardUp: {
      width: 80,
      height: 80,
      margin: 6,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1e293b",
    },
    cardDown: {
      width: 80,
      height: 80,
      margin: 6,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 46,
      color: "#334155",
    },
  });
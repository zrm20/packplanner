import { styleSheets } from 'min-document';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { useSelector } from 'react-redux'
import { kgToLbs } from '../globalFunctons';
import { colors } from '../styles/globalStyles'

export default function CategoryPieChart({ chartData }) {
    // chartData is an array of objects with a value, svg object with fill color, and key

    const settings = useSelector(state => state.settings.value);

    let totalWeight = 0;
    for(let i = 0; i < chartData.length; i++){
        totalWeight += chartData[i].value;
    }

    let totalWeightString;
    switch(settings.weightUnits){
        case('metric'): {totalWeightString = `${totalWeight.toFixed(1)} kg`}; break;
        case('imperial'): {totalWeightString = `${kgToLbs(totalWeight).toFixed(1)} lbs`}; break;
    }

    return (
        <View styles={styles.container}>
            <Text style={styles.text}>{totalWeightString}</Text>
            <PieChart
                style={ { height: '93%', width: '100%', paddingBottom: 8} }
                data={ chartData }
                innerRadius={ '15%' }
                outerRadius={ '90%' }
            >
            </PieChart>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    text: {
        color: colors.white,
        marginTop: 3,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

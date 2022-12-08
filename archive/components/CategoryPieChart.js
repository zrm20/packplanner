import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { kgToLbs } from '../globalFunctons';
import { colors } from '../styles/globalStyles';
import { PieChart } from 'react-native-chart-kit';

const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    // barPercentage: 0.5,
  };

export default function CategoryPieChart({ chartData }) {
    // chartData is an array of objects with a value, svg object with fill color, and key

    const settings = useSelector(state => state.settings.value);

    let totalWeight = 0;
    for (let i = 0; i < chartData.length; i++) {
        totalWeight += chartData[i].weight;
    }

    let totalWeightString;
    switch (settings.weightUnits) {
        case ('metric'): { totalWeightString = `${totalWeight.toFixed(1)} kg` }; break;
        case ('imperial'): { totalWeightString = `${kgToLbs(totalWeight).toFixed(1)} lbs` }; break;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{totalWeightString}</Text>
            <PieChart
                data={chartData}
                width={300}
                height={300}
                chartConfig={chartConfig}
                accessor={"weight"}
                backgroundColor={"transparent"}
                hasLegend={false}
                center={[50, 0]}
                absolute
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

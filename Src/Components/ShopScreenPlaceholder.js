import React from 'react';
import { FlatList, View } from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const list = [1, 2, 3, 4, 5, 6]

export default function ShopScreenPlaceholder() {
    return (
        <FlatList
            data={list}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => {
                return (
                    <View style={{ height: 40 }} />
                )
            }}
            renderItem={({ item, index }) => {
                return (
                    <View
                        key={index}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => props.navigation.navigate('ProductDetail', { item })}>
                        <SkeletonPlaceholder highlightColor="rgba(0,0,0,0.3)"  >
                            <View style={{
                                height: hp('50%'),
                                width: wp('92%'),
                                borderRadius: 5,
                            }}>
                            </View>
                        </SkeletonPlaceholder>
                    </View>
                )
            }}
        />
    )
}
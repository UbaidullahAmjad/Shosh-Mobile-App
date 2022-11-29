import React from 'react';
import { FlatList, View } from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const list = [1, 2, 3, 4, 6, 7]

export default function TopCoursesPlaceHolder() {
    return (
        <FlatList
            data={list}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => {
                return (
                    <View style={{ width: 20 }} />
                )
            }}
            renderItem={({ item, index }) => {
                return (
                    <View
                        key={index}
                        style={{
                            paddingLeft: index == 0 ? 5 : 0,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => props.navigation.navigate('ProductDetail', { item })}>
                        <SkeletonPlaceholder highlightColor="rgba(0,0,0,0.3)"  >
                            <View style={{
                                width: wp('45%'),
                                height: hp('20%'),
                            }}>
                            </View>
                        </SkeletonPlaceholder>
                    </View>
                )
            }}
        />
    )
}
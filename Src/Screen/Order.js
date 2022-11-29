import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import LocalizationContext from '../../LocalizationContext';
import { GetAllOrders } from '../Store/Actions/OrderAction';
import { LogOut } from '../Store/Actions/UserAction';
import { DataTable } from 'react-native-paper';

const Order = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const [isLoading, setLoading] = useState(true);

  const getOrders = async () => {
    setLoading(true);
    await props?.GetAllOrders(
      props?.user?.userData?.id
        ? props?.user?.userData?.id
        : props?.user?.userData?.ID,
    );
    setLoading(false);
  };

  useEffect(() => {
    if (props?.user?.userData?.ID || props?.user?.userData?.id) {
      getOrders();
    }
  }, []);

  return (
    <>
      {props?.user?.userData?.ID || props?.user?.userData?.id ? (
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <ActivityIndicator
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              color="black"
              size={'large'}
            />
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => {
                    if (props?.user?.userData?.ID || props?.user?.userData?.id) {
                      getOrders();
                    }
                  }}
                />
              }
              data={props?.order?.OrderList}
              keyExtractor={item => item.id}
              ListHeaderComponent={() => {
                return (
                  <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'center',
                        fontSize: heightPercentageToDP('3%'),
                        margin: 20,
                      }}>
                      {t('All Orders')}
                    </Text>
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'center',
                        fontSize: heightPercentageToDP('1.8%'),
                      }}>
                      {t('No Orders Found!')}
                    </Text>
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
                return (
                  <View style={{
                    backgroundColor: '#fff',
                    elevation: 3,
                    borderRadius: 5,
                    marginTop: 24,
                    marginHorizontal: 12
                  }}>
                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Title numberOfLines={3} style={{ flex: 1, }}>
                          ID
                        </DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 2 }}>
                          Total Product
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 2 }} numeric>Currency</DataTable.Title>
                        <DataTable.Title style={{ flex: 2 }} numeric>Total Price</DataTable.Title>
                      </DataTable.Header>
                    </DataTable>
                    <DataTable>
                      <DataTable.Row>
                        <DataTable.Cell numberOfLines={3} style={{ flex: 1, }}>
                          {item?.id}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2, justifyContent: "center" }} > {item?.line_items?.length}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2, justifyContent: "center" }} > {item?.currency}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }} numeric>{item?.total}</DataTable.Cell>
                      </DataTable.Row>

                    </DataTable>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Invoice', {
                          Order_Place: item,
                          keyScreen: 'OrderScreen',
                        })
                      }}
                      style={{
                        alignSelf: 'flex-end',
                        width: wp('20%'),
                        backgroundColor: "#218838",
                        paddingVertical: wp('1%'),
                        borderRadius: 8,
                        marginHorizontal: 12, marginVertical: 12
                      }}>
                      <Text style={{ color: '#fff', textAlign: "center" }}>View</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => props?.navigation.navigate('Login')}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text>{t('Login to view orders')}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const mapStateToProps = ({ user, order }) => ({
  user,
  order,
});

export default connect(mapStateToProps, { GetAllOrders, LogOut })(Order);

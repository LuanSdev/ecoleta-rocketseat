import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {Feather as Icon} from '@expo/vector-icons';
import Constants from 'expo-constants';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg';

const Points = () => {
  const navigate = useNavigation();

  function handleNavigateBack(){
    navigate.goBack();
  }

  function handleNavigateToDetail(){
    navigate.navigate('Details');
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={20} color="#34cb29" onPress={handleNavigateBack}/>
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo!</Text>
        <Text style={styles.description}>Econtre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView 
            style={styles.map}
            initialRegion={{
              latitude : -23.0737447,
              longitude : -48.9102096,
              latitudeDelta : 0.014,
              longitudeDelta : 0.014
            }}
          >
            <Marker 
              style={styles.mapMarker}
              onPress={handleNavigateToDetail}
              coordinate={{
                latitude : -23.0737447,
                longitude : -48.9102096,
                }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{uri : "https://skyhub.com.br/wp-content/uploads/2017/03/Como-entrar-em-um-marketplace.png"}}/>
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{
            paddingHorizontal : 20
          }}
        >
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="http://192.168.0.107:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>Lâmpadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="http://192.168.0.107:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>Lâmpadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="http://192.168.0.107:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>Lâmpadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="http://192.168.0.107:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>Lâmpadas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="http://192.168.0.107:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>Lâmpadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="http://192.168.0.107:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>Lâmpadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="http://192.168.0.107:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>Lâmpadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="http://192.168.0.107:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>Lâmpadas</Text>
        </TouchableOpacity>
        </ScrollView>
        
      </View>
    </>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;
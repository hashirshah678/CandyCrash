import {View, Text, ImageBackground, Image, FlatList} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles/commonStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {levelStyles} from '../styles/levelStyles';
import PressScale from '../components/ui/PressScale';
import {goBack} from '../utils/NavigationUtil';
import { useLevelStore } from '../state/useLevelStore';
import RenderItem from '../components/levelScreen/RenderItem';
import LevelFooter from '../components/levelScreen/LevelFooter';

const LevelScreen = () => {

  const {levels} = useLevelStore();


  return (
    <ImageBackground
      source={require('../assets/images/forest.jpeg')}
      style={commonStyles.container}>
      <SafeAreaView />
      <View style={levelStyles.flex1}>
        <PressScale onPress={() => goBack()}>
          <Image
            source={require('../assets/icons/back.png')}
            style={levelStyles.backIcon}
          />
        </PressScale>

        <ImageBackground
          source={require('../assets/images/lines.jpg')}
          style={levelStyles.levelContainer}>
          <View style={levelStyles.subLevelContainer}>
            <FlatList
              data={levels}
              renderItem={RenderItem}
              keyExtractor={(item:any) => item.id?.toString()}
              // @ts-ignore
              key={(item:any) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={levelStyles.columnWrapper}
              ListFooterComponent={LevelFooter}
            />
          </View>
        </ImageBackground>

        <View style={levelStyles.flex2}>
          <Text style={levelStyles.levelText}>
            Rule: Collect the minimum amount of candy before the time runs out.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LevelScreen;

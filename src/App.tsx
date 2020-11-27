import * as React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images: string[] = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=400&q=75',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=400&q=75',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=400&q=75',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=400&q=75',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=400&q=75',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=400&q=75',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=400&q=75',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=400&q=75',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=400&q=75',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=400&q=75',
];

type DataProps = {
  key: string;
  photo: string;
  avatar_url: string;
};

const data: DataProps[] = images.map((image, index) => ({
  key: String(index),
  photo: image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderListItem: ListRenderItem<DataProps> = ({item, index}) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-width * 0.7, 0, width * 0.7],
    });

    return (
      <ItemContainer>
        <PhotoBorder style={style.photoBorder}>
          <PhotoContainer>
            <Photo
              style={{
                transform: [{translateX}],
              }}
              source={{uri: item.photo}}
              resizeMode="cover"
            />
          </PhotoContainer>
          <Avatar source={{uri: item.avatar_url}} />
        </PhotoBorder>
      </ItemContainer>
    );
  };

  return (
    <Container>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.photo}
        renderItem={renderListItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const ItemContainer = styled.View`
  width: ${width}px;
  align-items: center;
  justify-content: center;
`;

const PhotoBorder = styled.View`
  border-radius: 18px;
  padding: 12px;
  background-color: white;
`;

const PhotoContainer = styled.View`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  overflow: hidden;
  align-items: center;
  border-radius: 14px;
`;

const Photo = styled(Animated.Image)`
  width: ${ITEM_WIDTH * 1.4}px;
  height: ${ITEM_HEIGHT}px;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border-width: 5px;
  border-color: white;
  position: absolute;
  bottom: -20px;
  right: 20px;
`;

const style = StyleSheet.create({
  photoBorder: {
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 20,
  },
});

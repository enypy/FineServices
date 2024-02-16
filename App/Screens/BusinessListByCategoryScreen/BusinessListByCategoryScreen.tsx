import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getBusinessListsByCategory } from '../../Utils/GlobalApi'
import BusinessListItem from './Components/BusinessListItem'
import Colors from '../../Utils/Colors'
import PageHeading from '../../Components/PageHeading'

export default function BusinessListByCategoryScreen() {

  const navigation = useNavigation()
  const param: { category : Category} = useRoute().params as { category: Category }
  const [businessListsByCategory, setBusinessListsByCategory] = useState<undefined | BusinessList["businessLists"]>(undefined)

  useEffect(() => {
    if (param && typeof param === 'object' && 'category' in param) {
      getBusinessListsByCategory(param.category)
        .then(res => {
          if (res && typeof res === 'object' && 'businessLists' in res) {
            setBusinessListsByCategory((res as BusinessList).businessLists)
          } else {
            throw new Error('BusinessListsByCategory : unexpected response')
          }
        })
        .catch(err => {
          console.error("Error fetching BusinessListsByCategory:", err)

        })
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <PageHeading title={param?.category} />
      {(businessListsByCategory && businessListsByCategory?.length > 0) ? <FlatList
        data={businessListsByCategory}
        style={{ marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item, index }) => (
          <BusinessListItem business={item} />
        )}
      /> :
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', marginTop: '20%', color: Colors.GRAY }}>No Business Found</Text>
      }
    </View>
  )
}
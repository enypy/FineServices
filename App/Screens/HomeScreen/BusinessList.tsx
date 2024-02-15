import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getBusinessLists } from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading'
import BusinessListItemSmall from './BusinessListItemSmall'


export default function BusinessList() {

    const [businessList, setBusinessList] = useState<undefined | BusinessList["businessLists"]>(undefined)

    useEffect(() => {
        getBusinessLists()
            .then((res: BusinessList | unknown) => {
                if (res && typeof res === 'object' && 'businessLists' in res) {
                    setBusinessList((res as BusinessList).businessLists)
                } else {
                    throw new Error('BUSINESSLIST : unexpected response')
                }
            })
            .catch(error => {
                console.error("Error fetching BusinessList:", error);
            })

    }, [])

    return (
        <View>
            <Heading heading={'Latest Business'} isViewAll={true} />
            <FlatList
                data={businessList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ marginRight: 10 }}>
                        <BusinessListItemSmall business={item} />
                    </View>
                )}
            />
        </View>
    )
}


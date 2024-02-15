import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, TextInput, NativeSyntheticEvent, TextInputChangeEventData, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import CalendarPicker from 'react-native-calendar-picker'
import Colors from '../../Utils/Colors'
import Heading from '../../Components/Heading'
import { createBooking } from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import { format } from 'date-fns'

type BookingModalParams = {
  isModalVisible: boolean,
  setIsModalVisible: Dispatch<SetStateAction<boolean>>,
  businessId: string | undefined
}

export default function BookingModal({ isModalVisible, setIsModalVisible, businessId }: BookingModalParams): React.JSX.Element {

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [scheduleList, setScheduleList] = useState<string[] | undefined>(undefined)
  const [selectedSchedule, setSelectedSchedule] = useState<undefined | string>(undefined)
  const [note, setNote] = useState<string>('')
  const { user } = useUser()

  useEffect(() => {
    const scheduleList = getScheduleList()
    setScheduleList(scheduleList)
  }, [])

  const getScheduleList = () => {
    const scheduleList = []
    for (let index = 8; index < 12; index++) {
      scheduleList.push(`${index}:00 AM`)
      scheduleList.push(`${index}:30 AM`)
    }

    for (let index = 1; index < 7; index++) {
      scheduleList.push(`${index}:00 PM`)
      scheduleList.push(`${index}:30 PM`)
    }

    return scheduleList
  }


  const createNewBooking = () => {

    if (!selectedDate && !selectedSchedule) {
      ToastAndroid.show('Please provide a date and select a schedule.', ToastAndroid.LONG)
      return

    }

    if (businessId && selectedDate && selectedSchedule && user) {
      const data = {
        businessId: businessId,
        date: format(selectedDate, 'dd-MMM-yyyy') ,
        time: selectedSchedule,
        userEmail: user.primaryEmailAddress?.emailAddress,
        userName: user.fullName,
        note: note
      }
      createBooking(data)
        .then(res => {
          ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG)
          setIsModalVisible(false)
        })
        .catch(err => {
          ToastAndroid.show('Something went wrong, please try again later...', ToastAndroid.LONG)
          console.log('err', err)
        }
        )
    } else {
      ToastAndroid.show('Something went wrong, please try again later...', ToastAndroid.LONG)
    }

  }

  return (
    <Modal animationType='slide' visible={isModalVisible}>
      <ScrollView>
        <KeyboardAvoidingView>
          <View
            style={{ paddingTop: 30, padding: 20, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
          >
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>
              {'Booking'}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Heading heading='Select Date' />
          </View>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={date => { setSelectedDate(date) }}
              textStyle={{ fontFamily: 'outfit' }}
              todayBackgroundColor={'transparent'}
              todayTextStyle={{ fontFamily: 'outfit-medium', textDecorationLine: 'underline' }}
              selectedDayColor={Colors.PRIMARY}
              selectedDayTextColor={Colors.WHITE}
              showDayStragglers={true}
              minDate={new Date()}
              restrictMonthNavigation={true}
              width={360}
            >
            </CalendarPicker>
          </View>

          <View style={{ marginLeft: 20, marginTop: 20 }}>
            <Heading heading='Select Schedule' />
            <FlatList
              data={scheduleList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => { setSelectedSchedule(item) }}
                >
                  <Text
                    style={(selectedSchedule === item) ? { ...styles.schedule, ...styles.selectedSchedule } : { ...styles.schedule }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{ margin: 20 }}>
            <Heading heading='Note (optional)' />
            <TextInput
              numberOfLines={4}
              multiline={true}
              placeholder='Type a message...'
              style={styles.noteTextArea}
              onChangeText={text => setNote(text)}
              value={note}
            />
          </View>
          <TouchableOpacity onPress={() => { createNewBooking() }}>
            <Text style={styles.confirmBtn}>Confirm & Book</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
    margin: 20,
    marginTop: 0
  },
  selectedSchedule: {
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY
  },
  schedule: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'outfit',
    borderColor: Colors.PRIMARY

  },
  confirmBtn: {
    borderRadius: 99,
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    elevation: 2,
    marginLeft: 20,
    marginRight: 20
  }
})
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"
import { Availability, TimeSlot } from "@/types"
import { TIME_FORMAT } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateTimeList = () => {
  const hoursArray = []
  const startTime = moment("12:00 AM", "h:mm A")
  const endTime = moment("11:30 PM", "h:mm A")
  const interval = 30

  let currentTime = startTime.clone()
  while (currentTime.isSameOrBefore(endTime)) {
    hoursArray.push(currentTime.format("h:mm A"))
    currentTime.add(interval, "minutes")
  }

  return hoursArray
}

export const addTwoHours = (inputTime: string) => {
  const parsedTime = moment(inputTime, "h:mm A")
  const resultTime = parsedTime.add(2, "hours")
  const formattedResultTime = resultTime.format("h:mm A")

  return formattedResultTime
}

function isTimeWithinRange(time: string, range: TimeSlot): boolean {
  const rangeStartTime = moment(range.startTime, TIME_FORMAT)
  const rangeEndTime = moment(range.endTime, TIME_FORMAT)
  const checkTime = moment(time, TIME_FORMAT)

  return checkTime.isBetween(rangeStartTime, rangeEndTime, null, "()")
}

export function getTimeOverlap(
  data: TimeSlot[],
  time: string
): TimeSlot | undefined {
  return data.find((item) => isTimeWithinRange(time, item))
}

export function getDatesForDaysInMonth(dayIndices: any[], inputDate?: Date) {
  // Get the current date
  const currentDate = inputDate ? moment(inputDate) : moment()

  // Get the current month
  const currentMonth = currentDate.month()

  // Create an array to store the dates
  const dates = []

  // Loop through each day index in the array
  for (const dayIndex of dayIndices) {
    // Use Moment.js to get the first occurrence of the specified day in the current month
    let dateObject = moment()
      .month(currentMonth)
      .date(1)
      .day(dayIndex + 7)

    // Continue adding dates while still in the current month

    while (dateObject.month() === currentMonth) {
      dates.push(dateObject.toDate())

      // Move to the next occurrence of the specified day in the current month
      dateObject = dateObject.add(7, "days")
    }
  }

  // Return the array of dates
  return dates
}

export function getDatesForFirstWeekInMonth(
  dayIndices: any[],
  inputDate?: Date
) {
  // Get the current date
  const currentDate = inputDate ? moment(inputDate) : moment()

  // Get the current month
  const currentMonth = currentDate.month()

  // Create an array to store the dates
  const dates = []

  // Loop through each day index in the array
  for (const dayIndex of dayIndices) {
    // Use Moment.js to get the first occurrence of the specified day in the current month
    let dateObject = moment()
      .month(currentMonth)
      .date(1)
      .day(dayIndex + 7)

    // Check if the date is in the first week
    if (dateObject.week() === currentDate.week()) {
      dates.push(dateObject.toDate())
    }
  }

  // Return the array of dates in the first week
  return dates
}

export const parseMapDaysToArray = (map: Availability) => {
  return Object.entries(map.days).map((day) => day[1])
}

export function combineDateAndTime(dateObject: Date, timeString: string) {
  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    throw new Error("Invalid Date object")
  }

  const timeFormat = /^\d{1,2}:\d{2} [APMapm]{2}$/
  if (!timeFormat.test(timeString)) {
    throw new Error("Invalid time string format")
  }

  const formattedDate = moment(dateObject).format("YYYY-MM-DD")

  const combinedMoment = moment(
    `${formattedDate} ${timeString}`,
    "YYYY-MM-DD h:mm A"
  )

  const isoString = combinedMoment.toISOString()

  return new Date(isoString)
}

export function convertUnixTimestampToISOString(unixTimestamp: any) {
  const isoString = moment.unix(unixTimestamp).toISOString()
  return isoString
}

export function convertISOToTimeString(isoString: string) {
  // Ensure isoString is a valid ISO 8601 format
  if (!moment(isoString, moment.ISO_8601, true).isValid()) {
    throw new Error("Invalid ISO 8601 datetime string")
  }

  // Convert ISO datetime string to moment object
  const momentObject = moment(isoString)

  // Format the moment object to display only the time part
  const timeString = momentObject.format("h:mm A")

  return timeString
}

export function filterUniqueUsers(dataArray: any[], property: string) {
  const uniqueUserIds = new Set()

  return dataArray.filter((obj) => {
    // Check if the user_id is already in the Set
    if (!uniqueUserIds.has(obj[property])) {
      // If not, add it to the Set and include the object in the result
      uniqueUserIds.add(obj[property])
      return true
    }
    // If user_id is already in the Set, exclude the object from the result
    return false
  })
}

export function parseToTime(time: number) {
  return convertISOToTimeString(convertUnixTimestampToISOString(time))
}

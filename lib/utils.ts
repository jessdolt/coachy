import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"
import { Availability, TimeSlot } from "@/types"
import { TIME_FORMAT } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates an array of time slots at 30-minute intervals from 12:00 AM to 11:30 PM.
 * @returns An array of formatted time strings.
 */
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

/**
 * Adds two hours to the input time and returns the formatted result.
 * @param inputTime - The input time in "h:mm A" format.
 * @returns The formatted time after adding two hours.
 */
export const addTwoHours = (inputTime: string) => {
  const parsedTime = moment(inputTime, "h:mm A")
  const resultTime = parsedTime.add(2, "hours")
  const formattedResultTime = resultTime.format("h:mm A")

  return formattedResultTime
}

/**
 * Checks if a given time is within a specified time range.
 * @param time - The time to check.
 * @param range - The time range (start and end time) to compare against.
 * @returns True if the time is within the range, false otherwise.
 */
export function isTimeWithinRange(time: string, range: TimeSlot): boolean {
  const rangeStartTime = moment(range.startTime, TIME_FORMAT)
  const rangeEndTime = moment(range.endTime, TIME_FORMAT)
  const checkTime = moment(time, TIME_FORMAT)

  return checkTime.isBetween(rangeStartTime, rangeEndTime, null, "()")
}

/**
 * Finds the overlapping time slot for a given time within a list of time slots.
 * @param data - An array of time slots.
 * @param time - The time to check for overlap.
 * @returns The overlapping time slot or undefined if no overlap is found.
 */
export function getTimeOverlap(
  data: TimeSlot[],
  time: string
): TimeSlot | undefined {
  return data.find((item) => isTimeWithinRange(time, item))
}

/**
 * Generates an array of dates for specified day indices in the current month.
 * @param dayIndices - An array of day indices.
 * @param inputDate - Optional: The base date for calculations.
 * @returns An array of date objects.
 */
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

/**
 * Generates an array of dates for specified day indices in the first week of the month.
 * @param dayIndices - An array of day indices.
 * @param inputDate - Optional: The base date for calculations.
 * @returns An array of date objects.
 */
export function getDatesForFirstWeekInMonth(
  dayIndices: any[],
  inputDate?: Date
) {
  const currentDate = inputDate ? moment(inputDate) : moment()

  // First day of the month
  const firstDayOfMonth = moment(currentDate).startOf("month")

  // First week of the month given
  const startOfWeek = firstDayOfMonth.startOf("week")

  const dates: Date[] = []

  // Loop through each day index in the array
  for (const dayIndex of dayIndices) {
    // Calculate the date for the specified day index in the first week
    const dateObject = startOfWeek.clone().day(dayIndex)

    dates.push(dateObject.toDate())
  }

  return dates
}

export const parseMapDaysToArray = (map: Availability) => {
  return Object.entries(map.days).map((day) => day[1])
}

/**
 * Combines a date object and a time string into a single Date object.
 * @param dateObject - The date object.
 * @param timeString - The time string in "h:mm A" format.
 * @returns A combined Date object.
 * @throws Error if dateObject is not a valid Date or timeString has an invalid format.
 */
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

/**
 * Converts a Unix timestamp to an ISO string.
 * @param unixTimestamp - The Unix timestamp.
 * @returns The ISO string representation of the Unix timestamp.
 */
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

/**
 * Filters an array of objects based on a unique property.
 * @param arr - The array to filter.
 * @param propertyName - The property name to determine uniqueness.
 * @returns An array of unique objects based on the specified property.
 */
export function filterUniqueUsers(arr: any[], propertyName: string) {
  const uniqueMap = new Map()

  for (const obj of arr) {
    const key = obj[propertyName]

    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, obj)
    }
  }

  return Array.from(uniqueMap.values())
}

/**
 * Parses a Unix timestamp and converts it to a formatted time string.
 * @param time - The Unix timestamp.
 * @returns A formatted time string.
 * @throws Error if the input time is not a valid Unix timestamp.
 */
export function parseToTime(time: number) {
  return convertISOToTimeString(convertUnixTimestampToISOString(time))
}

export function capitalizeFirstLetter(inputString: string) {
  if (!inputString) {
    return inputString
  } else {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
  }
}

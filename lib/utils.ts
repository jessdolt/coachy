import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"
import { TimeSlot } from "@/types"
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

// const currentData: Foo[] = [
//     { startTime: "9:00 AM", endTime: "11:00 AM" },
//     { startTime: "11:00 AM", endTime: "1:00 PM" },
// ];

// // should return { startTime: "11:00 AM", endTime: "1:00 PM" }
// console.log("11:01 am");
// console.log(getTimeOverlap(currentData, '11:01 am'));

// // should return undefined since there are no overlap
// console.log("1:31pm");
// console.log(getTimeOverlap(currentData, '1:31 pm'));

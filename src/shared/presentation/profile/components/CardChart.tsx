'use client'
import { Button, Card, Select, SelectItem } from '@heroui/react'
import { FaPlus } from 'react-icons/fa'
import { LuCalendarDays } from 'react-icons/lu'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const timeBarMode = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
]
const barOptions: ChartOptions<'bar'> = {
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: { font: { size: 14 }, boxWidth: 10, boxHeight: 10, padding: 16 },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
  responsive: true,
}
const lineOptions: ChartOptions<'line'> = {
  plugins: {
    legend: {
      position: 'bottom',
      align: 'center',
      labels: { font: { size: 14 }, boxWidth: 10, boxHeight: 10, padding: 16 },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
  responsive: true,
}
const barLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const barData = {
  labels: barLabels,
  datasets: [
    {
      label: 'Income',
      data: barLabels.map(() => faker.number.int({ min: 500, max: 1000 })),
      backgroundColor: 'rgba(102, 51, 153, 0.8)',
    },
    {
      label: 'Expenses',
      data: barLabels.map(() => faker.number.int({ min: 300, max: 400 })),
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
    },
  ],
}

const lineData = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  datasets: [
    {
      label: 'This month',
      backgroundColor: 'rgba(40, 167, 69, 0.6)',
      data: Array.from({ length: 30 }, () => faker.number.int({ min: 500, max: 1000 })),
      borderColor: 'rgba(40, 167, 69, 0.8)',
      fill: true,
    },
    {
      label: 'Last month',
      backgroundColor: 'rgba(178, 178, 178, 0.6)',
      data: Array.from({ length: 30 }, () => faker.number.int({ min: 400, max: 1200 })),
      borderColor: 'rgba(178, 178, 178, 0.8)',
      fill: true,
    },
  ],
}

export default function CardChart() {
  return (
    <div className="">
      <Card className="rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex w-full items-center justify-between">
          <p className="text-md font-semibold text-gray-700 md:text-lg">Preline</p>

          <div className="flex items-center gap-2">
            <Select
              className="w-28 rounded-md text-sm md:w-32"
              variant="faded"
              startContent={<LuCalendarDays className="h-6 w-6 text-gray-500" />}
              placeholder="Today"
              size="md"
              classNames={{
                trigger: 'flex items-center gap-0',
                selectorIcon: 'absolute end-1 mr-3 w-4 h-4 text-black',
              }}
            >
              {timeBarMode.map(mode => (
                <SelectItem key={mode.key} className="px-2 py-1 text-sm text-black">
                  {mode.label}
                </SelectItem>
              ))}
            </Select>
            <Button
              className="flex items-center justify-center font-semibold text-white md:min-w-[130px]"
              size="md"
              style={{ backgroundColor: 'rgba(102, 51, 153, 0.8)' }}
              startContent={<FaPlus />}
            >
              <span className="hidden md:block">Add Project</span>
            </Button>
          </div>
        </div>

        <div className="mx-2 mb-4 flex flex-col gap-4">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="text-md mb-3 text-start font-semibold text-black md:text-lg">
              $75,431.14 USD
            </h3>
            <Bar options={barOptions} data={barData} />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="mb-4 text-black">
              {' '}
              <h3 className="text-md mb-3 text-start font-semibold md:text-lg">Total sales</h3>
              <div className="md:text-md flex justify-between text-sm">
                <p>$1,597,820.75</p>
                <p>1,347,935 orders</p>
              </div>
            </div>
            <Line className="" data={lineData} options={lineOptions} />
          </div>
        </div>
      </Card>
    </div>
  )
}

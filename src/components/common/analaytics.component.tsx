import React, { useState, useEffect } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MAIN_COLOR } from '@/constant'
import { cn } from '@/lib/utils'

interface AnalyticsCardProps {
  title: string
  value: number
  previousValue: number
  currency?: string
  progressColor?: string
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  previousValue,
  currency = '$',
  progressColor = 'bg-green-500'
}) => {
  const [currentValue, setCurrentValue] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2000 // Animation duration in milliseconds
    const steps = 60 // Number of steps in the animation

    let start = 0
    const increment = (value - start) / steps
    const progressIncrement = 100 / steps

    const timer = setInterval(() => {
      start += increment
      setCurrentValue(Math.floor(start))
      setProgress((prevProgress) => {
        const newProgress = prevProgress + progressIncrement
        return newProgress > 100 ? 100 : newProgress
      })

      if (start >= value) {
        clearInterval(timer)
        setCurrentValue(value)
        setProgress(100)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const percentageChange = ((value - previousValue) / previousValue) * 100
  const isIncrease = percentageChange > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={`flex items-center ${
            isIncrease ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isIncrease ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          <span className="text-xs font-bold">
            {Math.abs(percentageChange).toFixed(2)}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(`text-2xl font-bold text-[${MAIN_COLOR}]`)}>
          {currency}
          {currentValue.toLocaleString()}
        </div>
        <Progress value={progress} className={`mt-2 text-${MAIN_COLOR}`} />
        <p className="text-xs text-muted-foreground mt-2">
          {isIncrease ? 'Increased' : 'Decreased'} from {currency}
          {previousValue.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCard
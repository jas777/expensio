import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Expense from '../../types/Expense';

import {
  defaultStyles,
  withTooltip,
  TooltipWithBounds,
  Tooltip,
} from '@visx/tooltip';
import { scaleLinear, scaleTime } from '@visx/scale';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { GridRows, GridColumns } from '@visx/grid';
import { AreaClosed, Bar, Line } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';

import { timeFormat } from 'd3-time-format';
import { bisector, extent, max } from 'd3-array';

type TooltipData = Expense; // tooltip start

export const background = '#c084fc';
export const background2 = '#F3F2F9';
export const accentColor = '#7e22ce';
export const accentColorDark = '#7e22ce';

export const tooltipStyles = {
  ...defaultStyles,
  background,
  border: '1px solid white',
  color: 'white',
}; // tooltip end

const formatDate = timeFormat("%b %d, '%y");

// accessors
const getDate = (d: Expense) => new Date(d.createdAt);
const getExpenseValue = (d: Expense | null) => d?.value ?? 0;
const bisectDate = bisector<Expense, Date>((d) => new Date(d.createdAt)).left;

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const ExpenseGraph = withTooltip<AreaProps & { data: Expense[] }, TooltipData>(
  ({
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    data,
  }) => {
    if (width < 10) return null;

    // bounds
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(data, getDate) as [Date, Date],
        }),
      [innerWidth, margin.left]
    );
    const expenseValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(data, getExpenseValue) || 0) + innerHeight / 3],
          nice: true,
        }),
      [margin.top, innerHeight]
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: expenseValueScale(getExpenseValue(d)),
        });
      },
      [dateScale, data, showTooltip, expenseValueScale]
    );

    return (
      <>
        <svg
          width={width - margin.left - margin.right}
          height={height - margin.top - margin.bottom}
        >
          <rect
            x={0}
            y={0}
            width={width - margin.left - margin.right}
            height={height - margin.top - margin.bottom}
            fill="url(#area-background-gradient)"
            rx={14}
          />
          <LinearGradient
            id="area-background-gradient"
            from={background}
            to={background2}
          />
          <LinearGradient
            id="area-gradient"
            from={accentColor}
            to={accentColor}
            toOpacity={0.1}
          />
          <GridRows
            left={margin.left}
            scale={expenseValueScale}
            width={width - margin.left - margin.right}
            strokeDasharray="1,3"
            stroke={"#0d0d0d"}
            strokeOpacity={0.2}
            pointerEvents="none"
          />
          <GridColumns
            top={margin.top}
            scale={dateScale}
            height={height - margin.top - margin.bottom}
            strokeDasharray="1,3"
            stroke={"#0d0d0d"}
            strokeOpacity={0.2}
            pointerEvents="none"
          />
          <AreaClosed<Expense>
            data={data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => expenseValueScale(getExpenseValue(d)) ?? 0}
            yScale={expenseValueScale}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {`${getExpenseValue(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: 'center',
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </>
    );
  }
);

export default ExpenseGraph;

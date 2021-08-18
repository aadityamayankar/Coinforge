import React from "react";
import { LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
const AXIS_COLOR = 'blue';
const AXIS_BOTTOM_TICK_LABEL_PROPS = {
    textAnchor: "middle",
    fontFamily: "Roboto",
    fontSize: 10,
    fill: AXIS_COLOR,
}
const AXIS_LEFT_TICK_LABEL_PROPS = {
    dx: "-0.25em",
    dy: "0.25em",
    fontFamily: "Roboto",
    fontSize: 10,
    textAnchor: "end",
    fill: AXIS_COLOR,
}

const LineChart = ({
  data,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  stroke,
  top,
  left,
  xTickFormat,
  children,
}) => {
  if (!data) return null;
  // accessors
  const getDate = (d) => new Date(d?.date);
  const getStockValue = (d) => d?.price;

  if (width < 10) return null;
  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <LinePath
        data={data}
        x={(data) => xScale(getDate(data)) || 0}
        y={(data) => yScale(getStockValue(data)) || 0}
        strokeWidth={1.5}
        stroke={stroke}
      />
      {/*
      {!hideBottomAxis && (
        <AxisBottom
          top={yMax + margin.top}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={AXIS_COLOR}
          tickStroke={AXIS_COLOR}
          tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={AXIS_COLOR}
          tickStroke={AXIS_COLOR}
          tickLabelProps={() => AXIS_LEFT_TICK_LABEL_PROPS}
          tickFormat={(data) => {
            return xTickFormat ? xTickFormat(data) : data;
          }}
        />
      )}
      {children} */}
    </Group>
  );
};

export default LineChart;
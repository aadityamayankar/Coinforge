import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()}`;

const AssetGraph = ({ assets }) => {
  const dataset = [],
    labels = [],
    backgroundColors = [],
    borderColors = [];

  assets.forEach((asset) => {
    dataset.push(asset.fraction);
    labels.push(asset.name);
    const color = randomRGB();
    backgroundColors.push(color + ',0.3)');
    borderColors.push(color + ',1)');
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'portfolio breakdown',
        data: dataset,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Box h='300px'>
        <Doughnut
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </Box>
    </>
  );
};
export default AssetGraph;

import React from 'react';
import styled from 'styled-components';

const Text = styled.text`
  font-family: Rockwell, serif;
  /* font-size: 96.6pt; */
  font-size: ${({ fontSize }) => fontSize};
`;

export default function Logo(props) {
  const { text } = props;

  return (
    <svg
      width={400}
      height={480}
      // viewBox="0 0 400 650"
      aria-label="Logo for Projektor"
    >
      <g fill="#00EBFF" opacity={0.5}>
        {/* <rect x={50} y={150} width={200} height={200} /> */}
        <path
          transform={'translate(50, 150)'}
          d="M0 0H100H200V100C200 155.228 155.228 200 100 200H0V100V50Z"
        />
      </g>
      <g fill="#FF00BC" opacity={0.5}>
        {/* <rect x={150} y={50} width={200} height={200} /> */}
        <path
          transform={'translate(150, 50)'}
          d="M0 0H100H200V100C200 155.228 155.228 200 100 200H0V100V50Z"
        />
      </g>
      <g fill="#FF7F00" opacity={0.5}>
        <circle cx={150} cy={150} r={100} />
      </g>
      <g fill="#FF7F00" opacity={0.5}>
        <circle cx={250} cy={150} r={100} />
      </g>
      <g fill="#FF7F00" opacity={0.5}>
        <circle cx={150} cy={250} r={100} />
      </g>
      {text && (
        <g>
          <Text x={50} y={450} textLength={300} fontSize={'4.15em'}>
            {text.toLowerCase()}
          </Text>
        </g>
      )}
    </svg>
  );
}

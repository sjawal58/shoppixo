/* eslint-disable no-unused-vars */
import React from 'react'
import styled from "@emotion/styled";
import { Skeleton } from '@mui/material';

const AdsInfoFlashBoxWrapper = styled("div")`
    display: ${(props) => props.fullwidth ? 'block' : 'inline-block'};
    background-color: #d7dcd9;
    padding: 8px 10px;
    border-radius: 30px;
`;

const AdsInfoFlashBoxBody = styled("div")`
    display: flex;
    align-items: center;
    min-height: 30px;
    .image {
      width: 40px;
      height: 50px;
      margin-right: 6px;
    }
`;

const AdsFlashInfo = styled("div")`
  p {
    margin-bottom: 0;
    line-height: 1.2;
    display: flex;
    align-items: center;
  }
  .title {
    margin-bottom: 0;
    margin-right: 5px;
    width: 50px;
  }
  .description {
    margin-bottom: 0;
    width: 80px;
  }
`;

const AdsInfoFlashBoxSkeleton = (props) => {

  const { fullwidth, } = props;

  return (
    <AdsInfoFlashBoxWrapper fullwidth={fullwidth}>
      <AdsInfoFlashBoxBody>
        <Skeleton className='image' />
        <AdsFlashInfo>
          <p> <Skeleton className='title' /> <Skeleton className='description' /></p>
        </AdsFlashInfo>
      </AdsInfoFlashBoxBody>
    </AdsInfoFlashBoxWrapper>
  )
}

export default AdsInfoFlashBoxSkeleton
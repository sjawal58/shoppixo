/* eslint-disable no-unused-vars */
import React from 'react'
import styled from "@emotion/styled";

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
`;

const AdsFlashImage = styled("img")`
  height: 50px;
  width: auto;
  margin-right: ${(props) => (props.title || props.description) ? '10px' : '0px'};
  border-radius: 15px;
`;

const AdsFlashInfo = styled("div")`
  p {
    margin-bottom: 0;
    font-size: 15px;
    line-height: 1.2;
  }
  span {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 17px;
    margin-right: 5px;
    text-transform: capitalize;
  }
`;

const AdsInfoFlashBox = (props) => {

  const { fullwidth, image, title, description } = props;

  return (
    <AdsInfoFlashBoxWrapper fullwidth={fullwidth}>
      <AdsInfoFlashBoxBody>
        {
          image && image != '/undefined' && image != 'undefined' && image != ''
          && <AdsFlashImage src={image} alt={image?.substring(image?.lastIndexOf('/') + 1)} title={title} description={description} />
        }
        <AdsFlashInfo>
          <p> <span>{title}</span> {description}</p>
        </AdsFlashInfo>
      </AdsInfoFlashBoxBody>
    </AdsInfoFlashBoxWrapper>
  )
}

export default AdsInfoFlashBox
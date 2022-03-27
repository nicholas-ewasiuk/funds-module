/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { List, Tooltip } from "antd"

import { InfoIcon } from "./images/InfoIcon";
import { TooltipData } from '../helpers';

type Props = {
  tooltipData: TooltipData[]
}

export const FundTooltip = ({ tooltipData }: Props) => {
  return (
    <StepTooltip 
      title={
        <>
          <span>Fund Composition</span>
          <List
            dataSource={tooltipData}
            renderItem={item => 
                <List.Item css={list_item}>
                  <span>{item.amount.toFixed(2)}</span>
                  <span>{item.ticker}</span>
                  <span>{item.weighting.toFixed(2)+'%'}</span>
                </List.Item>
            }
          />
        </>
      }
      placement='bottomRight'
    >
      <span>Across {tooltipData.length} Assets</span>
      <InfoIcon />
    </StepTooltip>
  );
};

const StepTooltip = styled(Tooltip)`
  width: 90px;
  margin: 0 0 10px 0;
  cursor: pointer; 
  & > span {
    margin-right: 5px;
    font-size: 10px;
    font-weight: normal;
    user-select: none; 
  }
`
const list_item = css`
  display: flex;
  justify-content: space-around;
  width: 185px;
`;
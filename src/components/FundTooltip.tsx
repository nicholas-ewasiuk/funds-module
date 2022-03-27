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
          <span css={css`margin-left: 7px;`}>Fund Composition</span>
          <List
            dataSource={tooltipData}
            renderItem={item => 
              <List.Item css={css`min-width: 200px;`}>
                <span css={css`margin-left: 7px;`}>{item.amount.toFixed(2)}</span>
                <span css={css`font-weight: bold;`}>{item.ticker}</span>
                <span css={css`margin-right: 7px;`}>{item.weighting.toFixed(2)+'%'}</span>
              </List.Item>
            }
          />
        </>
      }
      placement='bottomLeft'
    >
      <span>Across {tooltipData.length} Assets</span>
      <InfoIcon />
    </StepTooltip>
  );
};

const StepTooltip = styled(Tooltip)`
  margin: 0 0 10px 0;
  width: 90px;
  cursor: pointer; 
  & > span {
    margin-right: 5px;
    font-size: 10px;
    font-weight: normal;
  }
`;
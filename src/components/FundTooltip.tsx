/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { List, Tooltip } from "antd"
import { TooltipData } from '../helpers';
import { InfoIcon } from "./images/InfoIcon";

type Props = {
  index: number
  tooltipData: TooltipData[]
}

export const FundTooltip = ({ index, tooltipData }: Props) => {

  return (
    <Tooltip 
      css={[cell_row, tooltip]}
      title={
        <>
          <span>Fund Composition</span>
          <List
            dataSource={tooltipData}
            renderItem={item => 
              <>
                <List.Item css={list_item}>
                  <span>{'$'+item.amount.toFixed(2)}</span>
                  <span>{item.ticker}</span>
                  <span>{item.weighting.toFixed(2)+'%'}</span>
                </List.Item>
              </>
            }
          />
        </>
      }
      placement='bottomRight'
    >
      <span>Across {tooltipData.length} Assets</span>
      <InfoIcon />
    </Tooltip>
  );
};

const cell_row = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const tooltip = css`
  margin: 0 0 10px 0;
  & > span {
    margin-right: 5px;
    font-size: 10px;
    font-weight: normal;
  }
`;

const list_item = css`
  display: flex;
  justify-content: space-around;
  width: 185px;
`;
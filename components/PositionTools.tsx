/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button } from "antd";

import { FundTooltip } from './FundTooltip';
import { TooltipData } from '../helpers';

type Props = {
  tooltipDataArr: TooltipData[][] | undefined
  value: string
  recordKey: number 
}

export const PositionTools = ({ tooltipDataArr, value, recordKey }: Props) => {
  return (
    <div 
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      `}
    >
      <span
        css={css`
          margin: 0 0 5px 0;
          font-weight: bold;
        `}
      >
        {'$'+parseFloat(value).toFixed(2)}
      </span>
      { tooltipDataArr && 
        <FundTooltip 
          tooltipData={tooltipDataArr[recordKey]}
        />
      }
      <div>
        <Button>
          Step in
        </Button>
        <Button 
          css={css`
            margin-left: 10px;
            border-style: none;
            background-color: #3D3D3D;
            color: #B2B2B2;
            &:hover {
              background-color: #B2B2B2;
              color: #000;
            }
            &:focus {
              background-color: #3D3D3D;
              color: #B2B2B2;
            }
          `}
        >
          Step out
        </Button>
      </div>
    </div>
  );
};
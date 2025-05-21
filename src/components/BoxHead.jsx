import { Typography } from "antd";
import styled from "styled-components";

const BoxHead = ({ title, desc, align = "center" }) => {
  const TitleContainer = styled.div`
    h1 {
      position: relative;
      padding: 0;
      margin: 0;
      font-family: "Raleway", sans-serif;
      font-weight: 300;
      font-size: 28px;
      color: #0073ff;
      transition: all 0.4s ease;

      text-align: center;
      text-transform: uppercase;
      padding-bottom: 5px;
    }

    h1 span {
      display: block;
      font-size: 0.5em;
      line-height: 1.3;
    }

    h1 em {
      font-style: normal;
      font-weight: 600;
    }

    /* Before pseudo-element for h1 */
    h1::before {
      width: 28px;
      height: 5px;
      display: block;
      content: "";
      position: absolute;
      bottom: 3px;
      left: 50%;
      margin-left: -14px;
      background-color: #1a77b0;
    }

    /* After pseudo-element for h1 */
    h1::after {
      width: 100px;
      height: 1px;
      display: block;
      content: "";
      position: relative;
      margin-top: 25px;
      left: 50%;
      margin-left: -50px;
      background-color: #dce2f6;
    }
  `;
  return (
    <div style={{ textAlign: align, marginBottom: "58px" }}>
      <TitleContainer>
        <h1>{title}</h1>
      </TitleContainer>
      {desc && (
        <Typography.Text style={{ fontSize: "15px" }} type="secondary">
          {desc}
        </Typography.Text>
      )}
    </div>
  );
};

export default BoxHead;

import styled from "styled-components";

const SidePadding = (props) => {
  return <StyledSidePadding>{props.children}</StyledSidePadding>;
};

export default SidePadding;

const StyledSidePadding = styled.div`
  width: 68rem;
  height: 90vh;
  max-width: 90%;
  margin-top: 4px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
  padding-top: 1rem;
`;

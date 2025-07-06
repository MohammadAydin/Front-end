import styled from "styled-components";

const Wrapper = styled.div`
  select option[disabled] {
    color: #aaa;
  }

  select:invalid {
    color: #aaa;
  }
`;

export default Wrapper;

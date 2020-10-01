import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    margin: 1em 0;
  }

  h2 {
    margin: 0.5em 0;
  }
`;

export const Section = styled.div`
  text-align: start;
  margin: 2em 0;
`

export const TextBox = styled.div`
  border: 1px solid #000;
  padding: 1em;

  p {
    padding: 0.2em;
  }

  div {
    display: flex;
    justify-content: space-between
  }

`

export const Grid = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  grid-gap: 2em;
`

export const Button = styled.button`
  background: #fbb04d;
  color: #000;
  border: 0;
  padding: 12px 20px;
  margin: 1em 1em 1em 0;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.2s;
  align-self: end;
`

export const Loading = styled.h1`
  font-size: 42px;
`
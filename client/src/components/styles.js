import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f3f4f6;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: #333;
`;

export const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

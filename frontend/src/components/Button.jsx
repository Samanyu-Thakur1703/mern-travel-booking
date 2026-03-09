import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  transition: all 0.3s ease;

  background: ${({ $variant }) =>
    $variant === "secondary"
      ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};

  color: white;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
    >
      {children}
    </StyledButton>
  );
}